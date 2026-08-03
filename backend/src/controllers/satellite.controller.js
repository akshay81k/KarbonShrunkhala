const satelliteService = require("../services/satellite.service");

class SatelliteController {
  async runAnalysis(req, res) {
    try {
      const report = await satelliteService.runAnalysisForProject(req.params.projectId);
      return res.status(200).json({
        success: true,
        message: "Sentinel-2 satellite analysis completed.",
        data: report,
      });
    } catch (err) {
      console.error("Satellite Analysis Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to execute satellite analysis.",
      });
    }
  }

  async getProjectReports(req, res) {
    try {
      const reports = await satelliteService.getReportsByProjectId(req.params.projectId);
      return res.status(200).json({
        success: true,
        count: reports.length,
        data: reports,
      });
    } catch (err) {
      console.error("Get Project Reports Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch satellite reports.",
      });
    }
  }
}

module.exports = new SatelliteController();
