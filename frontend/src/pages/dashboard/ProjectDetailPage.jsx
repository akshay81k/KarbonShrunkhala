import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { projectService } from "../../services/projectService";
import { satelliteService } from "../../services/satelliteService";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../../components/Badge";
import { Card } from "../../components/Card";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  FileCode,
  Loader2,
  Send,
  Download,
  Globe,
  Sparkles,
} from "lucide-react";

export function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const fetchProject = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (err) {
      console.error("Fetch Project Detail Error:", err);
      setError(err.message || "Project not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  // Render Leaflet Map when project is loaded
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

    // Render boundary if available
    let geoData = project.geojsonBoundary;
    if (typeof geoData === "string") {
      try {
        geoData = JSON.parse(geoData);
      } catch (err) {}
    }

    if (geoData) {
      try {
        const layer = L.geoJSON(geoData, {
          style: {
            color: "#22A06B",
            fillColor: "#22A06B",
            fillOpacity: 0.4,
            weight: 3,
          },
        }).addTo(map);

        map.fitBounds(layer.getBounds(), { padding: [40, 40] });
      } catch (err) {
        console.warn("Failed to render GeoJSON boundary on map:", err);
      }
    }

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 250);
  }, [project, loading]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const updated = await projectService.updateProject(id, { status: newStatus });
      setProject(updated);
    } catch (err) {
      alert(err.message || "Failed to update project status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="text-xs font-medium">Loading project details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-4">
        <Link to="/dashboard/projects" className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <Card className="p-8 text-center text-rose-600 text-xs font-medium">
          {error || "Project not found."}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Back Navigation */}
      <Link to="/dashboard/projects" className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Portfolio
      </Link>

      {/* Main Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-extrabold text-slate-900">{project.name}</h1>
              <Badge variant={project.status}>{project.status}</Badge>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {project.district}, {project.state} — Platform ID: <span className="font-mono text-slate-700 font-bold">{project.id.slice(0, 8)}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {project.status === "DRAFT" && user?.role === "NGO" && (
              <button
                onClick={() => handleStatusChange("SUBMITTED")}
                disabled={updating}
                className="px-4 py-2 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> Submit for Verification
              </button>
            )}

            {(user?.role === "VERIFIER" || user?.role === "GOVERNMENT") && project.status === "SUBMITTED" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange("APPROVED")}
                  disabled={updating}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition cursor-pointer"
                >
                  Approve Project
                </button>
                <button
                  onClick={() => handleStatusChange("REJECTED")}
                  disabled={updating}
                  className="px-3.5 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition cursor-pointer"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ecosystem Type</span>
          <span className="font-heading text-lg font-extrabold text-slate-900 mt-1 block">{project.ecosystemType}</span>
        </Card>
        <Card>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Area</span>
          <span className="font-heading text-lg font-extrabold text-emerald-700 mt-1 block">{project.areaHectares} Hectares</span>
        </Card>
        <Card>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Baseline Carbon</span>
          <span className="font-heading text-lg font-extrabold text-blue-700 mt-1 block">
            {project.baselineCarbonStock ? `${project.baselineCarbonStock} tCO₂e` : "Pending Calculation"}
          </span>
        </Card>
        <Card>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Date Registered</span>
          <span className="font-heading text-lg font-extrabold text-slate-700 mt-1 block">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </Card>
      </div>

      {/* Description, Interactive Map, & Documents Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Map Preview */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                Satellite Map &amp; Spatial Boundary
              </h3>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Esri Satellite Layer
              </span>
            </div>
            <div ref={mapContainerRef} className="w-full h-72 z-10" />
          </Card>

          {/* Description */}
          <Card className="space-y-2">
            <h3 className="font-heading text-sm font-bold text-slate-900">Project Overview</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {project.description || "No description provided."}
            </p>
          </Card>

          {/* Documents Section */}
          <Card className="space-y-3 p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading text-sm font-bold text-slate-900">Attached Documents &amp; Evidence</h3>
              <span className="text-xs font-semibold text-slate-500">{project.documents?.length || 0} Files</span>
            </div>

            {project.documents?.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">No documents uploaded yet.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {project.documents?.map((doc) => (
                  <div key={doc.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{doc.fileName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{(doc.fileSize / 1024).toFixed(1)} KB — {doc.fileType}</p>
                      </div>
                    </div>
                    <a
                      href={`http://localhost:5000${doc.storageUrl || doc.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: GeoJSON Payload Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading text-sm font-bold text-slate-900">GeoJSON Polygon Data</h3>
              <FileCode className="w-4 h-4 text-emerald-600" />
            </div>

            {project.geojsonBoundary ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-600">Polyline &amp; Coordinates:</p>
                <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl text-[10px] font-mono overflow-x-auto max-h-72">
                  {typeof project.geojsonBoundary === "string"
                    ? project.geojsonBoundary
                    : JSON.stringify(project.geojsonBoundary, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No GeoJSON boundary attached to this project.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
