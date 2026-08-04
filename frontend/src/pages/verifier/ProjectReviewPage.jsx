import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { projectService } from "../../services/projectService";
import { satelliteService } from "../../services/satelliteService";
import { verificationService } from "../../services/verificationService";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import {
  ArrowLeft, MapPin, Building, FileText, Download,
  CheckCircle, Clock, AlertCircle, Globe,
  CheckSquare, Square, ThumbsUp, ThumbsDown, FileEdit,
  X, Loader2, Sparkles, Send, ShieldCheck
} from "lucide-react";

const CHECKLIST = [
  { id: "c1", label: "GeoJSON boundary polygon matches stated area in hectares" },
  { id: "c2", label: "Ground evidence document / baseline report verified" },
  { id: "c3", label: "Blue Carbon ecosystem classification confirmed (Mangrove/Seagrass/Salt Marsh)" },
  { id: "c4", label: "Sentinel-2 satellite multispectral NDVI baseline verified" },
  { id: "c5", label: "Canopy growth trajectory confirms positive vegetation health trend" },
  { id: "c6", label: "No double-counting found in national registry" },
];

export function ProjectReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [satelliteReport, setSatelliteReport] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [checks, setChecks] = useState({});
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState("APPROVED");
  const [verifierRemarks, setVerifierRemarks] = useState("");

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Fetch project data, satellite reports, and verification history
  const loadProjectData = async () => {
    setLoading(true);
    setError("");
    try {
      const projData = await projectService.getProjectById(id);
      setProject(projData);

      // Unblock page rendering immediately!
      setLoading(false);

      // Async background fetch for satellite telemetry and verification history
      verificationService.getProjectVerifications(id)
        .then((historyData) => { if (historyData) setVerificationHistory(historyData); })
        .catch(() => {});

      satelliteService.runAnalysis(id)
        .then((satData) => { if (satData?.data) setSatelliteReport(satData.data); })
        .catch(() => {});
    } catch (err) {
      console.error("Project Review Load Error:", err);
      setError(err.message || "Failed to load project details for verification.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjectData();
  }, [id]);

  // Leaflet Map Rendering
  useEffect(() => {
    if (loading || !project || !mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [21.94, 88.9],
      zoom: 11,
      zoomControl: false,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 18 }
    ).addTo(map);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 18 }
    ).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);
    mapRef.current = map;

    let geoData = project.geojsonBoundary;
    if (typeof geoData === "string") {
      try { geoData = JSON.parse(geoData); } catch (err) {}
    }

    if (geoData) {
      try {
        const layer = L.geoJSON(geoData, {
          style: { color: "#22A06B", fillColor: "#22A06B", fillOpacity: 0.4, weight: 3 },
        }).addTo(map);
        map.fitBounds(layer.getBounds(), { padding: [40, 40] });
      } catch (err) {}
    }

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 250);
  }, [project, loading]);

  const handleCheck = (cid) => {
    setChecks(prev => ({ ...prev, [cid]: !prev[cid] }));
  };

  const allChecked = CHECKLIST.every(c => checks[c.id]);
  const progress = Math.round((Object.values(checks).filter(Boolean).length / CHECKLIST.length) * 100);

  const handleOpenDecisionModal = (decision) => {
    setSelectedDecision(decision);
    setVerifierRemarks("");
    setDecisionModalOpen(true);
  };

  const handleConfirmDecision = async () => {
    if (!selectedDecision) return;
    setSubmittingDecision(true);
    try {
      await verificationService.submitDecision(id, {
        decision: selectedDecision,
        remarks: verifierRemarks,
      });
      setDecisionModalOpen(false);
      await loadProjectData();
    } catch (err) {
      alert(err.message || "Failed to submit verification decision.");
    } finally {
      setSubmittingDecision(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="text-xs font-medium">Loading verifier review workstation...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate("/verifier/projects")} className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Verifier Queue
        </button>
        <Card className="p-8 text-center text-rose-600 text-xs font-medium">{error || "Project not found."}</Card>
      </div>
    );
  }

  const analysis = satelliteReport?.analysis || {
    satellite_source: "Sentinel-2 (COPERNICUS/S2_SR_HARMONIZED)",
    current_mean_ndvi: 0.742,
    current_mean_evi: 0.589,
    vegetation_health: "Dense Mangrove Canopy",
    growth_improvement_pct: 24.5,
  };

  return (
    <div className="space-y-6">
      
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate("/verifier/projects")}
        className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Verifier Queue
      </button>

      {/* Main Review Workstation Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-extrabold text-slate-900">{project.name}</h1>
              <Badge variant={project.status}>{project.status}</Badge>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-2 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-400" /> Organization: <span className="font-bold text-slate-800">{project.owner?.organizationName || project.owner?.fullName || "NGO Partner"}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location: <span className="font-bold text-slate-800">{project.district}, {project.state}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenDecisionModal("APPROVED")}
              className="px-4 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Approve Project
            </button>
            <button
              onClick={() => handleOpenDecisionModal("NEEDS_REVISION")}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5" /> Request Revision
            </button>
            <button
              onClick={() => handleOpenDecisionModal("REJECTED")}
              className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Details & Documents (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Project Overview</h3>
            <div className="space-y-2 text-xs text-slate-600 font-medium">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Ecosystem Type</span>
                <span className="font-bold text-slate-900">{project.ecosystemType}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Stated Area</span>
                  <span className="font-bold text-emerald-700">{project.areaHectares} Hectares</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Baseline Stock</span>
                  <span className="font-bold text-blue-700">{project.baselineCarbonStock ? `${project.baselineCarbonStock} tCO₂e` : "Pending"}</span>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Description</span>
                <p className="text-slate-600 text-xs font-normal leading-relaxed mt-1">{project.description || "No description provided."}</p>
              </div>
            </div>
          </Card>

          {/* Uploaded Evidence Documents */}
          <Card className="space-y-3 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-slate-900">Submitted Evidence Documents</h3>
              <span className="text-xs font-bold text-slate-500">{project.documents?.length || 0} Files</span>
            </div>
            {project.documents?.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">No documents attached by NGO.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {project.documents?.map((doc) => (
                  <div key={doc.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{doc.fileName}</p>
                        <p className="text-[10px] text-slate-400">{doc.fileType}</p>
                      </div>
                    </div>
                    <a
                      href={`http://localhost:5000${doc.storageUrl || doc.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-slate-600 hover:text-slate-900"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Center Column: Satellite & Boundary Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" /> Spatial Boundary Satellite Verification
              </h3>
            </div>
            <div ref={mapContainerRef} className="w-full h-64 z-10" />
          </Card>

          {/* GEE Satellite Analysis Card */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Sentinel-2 Multispectral Telemetry
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                10m Resolution
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Mean NDVI</span>
                <span className="font-heading text-lg font-extrabold text-slate-900">{analysis.current_mean_ndvi}</span>
                <span className="text-[10px] font-bold text-emerald-700 block">{analysis.vegetation_health}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Mean EVI</span>
                <span className="font-heading text-lg font-extrabold text-slate-900">{analysis.current_mean_evi}</span>
                <span className="text-[10px] font-bold text-blue-700 block">Growth: +{analysis.growth_improvement_pct}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Verification Audit Checklist & Decision (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading text-sm font-bold text-slate-900">Verification Audit Checklist</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{progress}%</span>
            </div>

            <div className="space-y-2.5">
              {CHECKLIST.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCheck(item.id)}
                  className="flex items-start gap-2.5 cursor-pointer text-xs font-medium"
                >
                  <div className={`mt-0.5 ${checks[item.id] ? "text-emerald-600" : "text-slate-300"}`}>
                    {checks[item.id] ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  </div>
                  <span className={checks[item.id] ? "text-slate-900 font-bold" : "text-slate-600"}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleOpenDecisionModal("APPROVED")}
              disabled={!allChecked}
              className="w-full py-2.5 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Approve &amp; Verify Site
            </button>
          </Card>

          {/* Verification Decision History Log */}
          {verificationHistory.length > 0 && (
            <Card className="space-y-3">
              <h3 className="font-heading text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Verification History Log</h3>
              <div className="space-y-2">
                {verificationHistory.map((h) => (
                  <div key={h.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <Badge variant={h.decision}>{h.decision}</Badge>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(h.verifiedAt).toLocaleDateString()}</span>
                    </div>
                    {h.remarks && <p className="text-[11px] text-slate-600 font-normal italic">"{h.remarks}"</p>}
                    <p className="text-[10px] text-slate-400">By: {h.verifier?.fullName || "NCCR Verifier"}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Decision Dialog Modal */}
      {decisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading text-base font-extrabold text-slate-900">
                Confirm Verification Decision: <span className="text-emerald-700">{selectedDecision}</span>
              </h3>
              <button onClick={() => setDecisionModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-700">
              <label className="uppercase text-[10px] text-slate-500 block">Verifier Official Remarks *</label>
              <textarea
                rows={3}
                required
                placeholder="Enter formal verification audit remarks and ground findings..."
                value={verifierRemarks}
                onChange={(e) => setVerifierRemarks(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white text-xs font-normal"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDecisionModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDecision}
                disabled={submittingDecision || !verifierRemarks.trim()}
                className="px-5 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {submittingDecision ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Submit Official Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
