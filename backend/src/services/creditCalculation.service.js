const prisma = require("../config/db");
const projectRepository = require("../repositories/project.repository");
const axios = require("axios");

class CreditCalculationService {
  /**
   * Baseline annual sequestration rates (tCO2e / ha / year)
   * Based on IPCC 2013 Wetlands Supplement & Verra VM0033 Methodology
   */
  static BASELINE_RATES = {
    MANGROVE: 8.50,
    SEAGRASS: 4.20,
    SALT_MARSH: 6.10,
    TIDAL_WETLAND: 5.00,
  };

  static LEAKAGE_DEDUCTION_RATE = 0.05; // 5% Activity displacement leakage
  static RISK_BUFFER_RATE = 0.10;       // 10% Non-permanence buffer reserve
  static METHODOLOGY_VERSION = "IPCC-2013-VM0033-v1.0";

  /**
   * Dynamically calculate recommended carbon credits for a project using real GEE & boundary metrics
   */
  async calculateForProject(projectId) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    const areaHectares = parseFloat(project.areaHectares) || 0.0;
    const ecosystemType = (project.ecosystemType || "MANGROVE").toUpperCase();
    const baselineRate = CreditCalculationService.BASELINE_RATES[ecosystemType] || 8.50;

    // Fetch live or existing GEE Sentinel-2 satellite report metrics
    let meanNdvi = 0.65;
    let meanEvi = 0.48;
    let growthPct = 12.5;
    let vegHealth = "Vigorous / Healthy";
    let isLiveGee = false;

    try {
      // Fetch latest satellite report from DB or query python GEE service
      const latestReport = await prisma.satelliteReport.findFirst({
        where: { projectId },
        orderBy: { reportDate: "desc" },
      });

      if (latestReport) {
        meanNdvi = parseFloat(latestReport.meanNdvi) || 0.65;
        meanEvi = parseFloat(latestReport.meanEvi) || 0.48;
        vegHealth = latestReport.vegetationHealth || vegHealth;
        isLiveGee = true;
      }

      // Query live python-service if GeoJSON boundary exists
      if (project.geojsonUrl) {
        const pythonUrl = process.env.PYTHON_SERVICE_URL || "http://localhost:8000";
        let geojsonBoundary = null;

        const path = require("path");
        const fs = require("fs");
        const fullPath = path.join(__dirname, "../../", project.geojsonUrl);
        if (fs.existsSync(fullPath)) {
          geojsonBoundary = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        }

        if (geojsonBoundary) {
          const geeRes = await axios.post(`${pythonUrl}/satellite/analyze`, {
            geojson: geojsonBoundary,
            months_back: 6,
          }, { timeout: 15000 }).catch(() => null);

          if (geeRes && geeRes.data && geeRes.data.success) {
            const data = geeRes.data.data;
            meanNdvi = parseFloat(data.current_mean_ndvi) || meanNdvi;
            meanEvi = parseFloat(data.current_mean_evi) || meanEvi;
            growthPct = parseFloat(data.growth_percentage) || growthPct;
            vegHealth = data.vegetation_health || vegHealth;
            isLiveGee = true;
          }
        }
      }
    } catch (err) {
      console.warn("GEE Telemetry fetch warning for calculation:", err.message);
    }

    // Mathematical Factors Calculation (IPCC Tier 2 equations)
    // 1. Satellite Canopy Vigor Multiplier (Normalized around 0.60 standard)
    const ndviFactor = Math.max(0.20, Math.min(1.25, meanNdvi / 0.60));

    // 2. Restoration Biomass Growth Multiplier
    const growthFactor = 1.0 + Math.max(-0.20, Math.min(0.30, growthPct / 100));

    // 3. Gross Carbon Sequestration (tCO2e)
    const monitoringYears = 1.0;
    const grossSequestration = areaHectares * baselineRate * ndviFactor * growthFactor * monitoringYears;

    // 4. Leakage Deduction (5%)
    const leakageDeduction = grossSequestration * CreditCalculationService.LEAKAGE_DEDUCTION_RATE;
    const netSequestration = grossSequestration - leakageDeduction;

    // 5. Non-Permanence Buffer Reserve (10%)
    const bufferReserve = netSequestration * CreditCalculationService.RISK_BUFFER_RATE;

    // 6. Recommended Carbon Credits (tCO2e)
    const recommendedCredits = Math.max(0, Math.round((netSequestration - bufferReserve) * 100) / 100);

    return {
      success: true,
      projectId: project.id,
      projectName: project.projectName,
      methodologyVersion: CreditCalculationService.METHODOLOGY_VERSION,
      recommendedCredits,
      isLiveGee,
      formula: "C_recommended = Area * Rate_baseline * f_NDVI * f_growth * (1 - Leakage) * (1 - Buffer)",
      parameters: {
        areaHectares,
        ecosystemType,
        baselineRate,
        meanNdvi: parseFloat(meanNdvi.toFixed(4)),
        meanEvi: parseFloat(meanEvi.toFixed(4)),
        growthPct: parseFloat(growthPct.toFixed(2)),
        vegHealth,
        ndviFactor: parseFloat(ndviFactor.toFixed(4)),
        growthFactor: parseFloat(growthFactor.toFixed(4)),
        monitoringYears,
        leakageRate: CreditCalculationService.LEAKAGE_DEDUCTION_RATE,
        bufferRate: CreditCalculationService.RISK_BUFFER_RATE,
      },
      intermediateCalculations: {
        grossSequestration: parseFloat(grossSequestration.toFixed(2)),
        leakageDeduction: parseFloat(leakageDeduction.toFixed(2)),
        netSequestration: parseFloat(netSequestration.toFixed(2)),
        bufferReserveWithheld: parseFloat(bufferReserve.toFixed(2)),
      },
    };
  }
}

module.exports = new CreditCalculationService();
