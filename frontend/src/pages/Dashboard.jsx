import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { projectService } from "../services/projectService";
import { creditService } from "../services/creditService";
import { Badge } from "../components/Badge";
import {
  FolderKanban, Maximize2, Award, ShieldCheck,
  PlusCircle, FileSpreadsheet, Eye, ArrowRight,
  MapPin, ChevronRight, Loader2,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [projData, creditData] = await Promise.all([
        projectService.getMyProjects().catch(() => []),
        creditService.getMyCredits().catch(() => []),
      ]);
      setProjects(projData);
      setCredits(creditData);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Filter projects by active tab
  const getFilteredProjects = () => {
    switch (activeTab) {
      case "approved":
        return projects.filter((p) => p.status === "APPROVED");
      case "pending":
        return projects.filter((p) => p.status === "SUBMITTED" || p.status === "UNDER_VERIFICATION");
      case "rejected":
        return projects.filter((p) => p.status === "REJECTED");
      case "draft":
        return projects.filter((p) => p.status === "DRAFT");
      default:
        return projects;
    }
  };

  const filteredProjects = getFilteredProjects();

  // Real Database Aggregations
  const totalProjects = projects.length;
  const totalAreaHectares = projects.reduce((sum, p) => sum + (parseFloat(p.areaHectares) || 0), 0);
  const totalCreditsEarned = credits.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Projects</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalProjects}</span>
          <span className="text-[10px] font-bold text-emerald-700 block">Registered in Registry</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Maximize2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Area</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalAreaHectares.toFixed(2)} Ha</span>
          <span className="text-[10px] font-bold text-blue-700 block">GeoJSON Boundary Area</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Credits Earned</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalCreditsEarned.toLocaleString()} tCO₂e</span>
          <span className="text-[10px] font-bold text-purple-700 block">Polygon Amoy Minted</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2 border-l-4 border-l-cyan-600">
          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Sites</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{approvedCount} Sites</span>
          <span className="text-[10px] font-bold text-cyan-700 block">Approved by Verifier</span>
        </div>

      </div>

      {/* ── Main Workstation Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Project List Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h3 className="font-heading text-sm font-extrabold text-slate-900">
                Project Portfolio &amp; Verification Status
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">Real-time status of your Blue Carbon restoration sites</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl text-xs font-bold text-slate-600 self-start sm:self-auto">
              {["all", "approved", "pending", "rejected", "draft"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition cursor-pointer text-[11px] ${
                    activeTab === tab ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 flex-1">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                <span className="text-xs font-medium">Fetching real projects from database...</span>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-10 text-center text-slate-400 space-y-2">
                <FolderKanban className="w-9 h-9 mx-auto text-slate-300 stroke-[1.5]" />
                <p className="text-xs font-bold text-slate-600">No projects found for status '{activeTab}'.</p>
                <p className="text-[11px] text-slate-400">Click 'New Project' above to register a site and track GEE monitoring.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 px-2 rounded-xl transition">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link to={`/dashboard/projects/${p.id}`} className="font-heading text-sm font-bold text-slate-900 hover:text-emerald-600 transition">
                          {p.projectName || p.name}
                        </Link>
                        <Badge variant={p.status}>{p.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {p.district}, {p.state}
                        </span>
                        <span>•</span>
                        <span>{p.ecosystemType}</span>
                        <span>•</span>
                        <span className="font-bold text-slate-700">{p.areaHectares} Ha</span>
                      </div>
                    </div>

                    <Link
                      to={`/dashboard/monitoring?project=${p.id}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold rounded-lg transition inline-flex items-center gap-1 shrink-0 self-start sm:self-auto"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Satellite Feed
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Tokenized Credits & Satellite Link */}
        <div className="space-y-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-heading text-sm font-extrabold text-slate-900">
              Tokenized Carbon Credit Holdings
            </h3>

            {credits.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 space-y-1 border border-dashed border-slate-200 rounded-xl">
                <p className="font-bold text-slate-500">No credits issued yet.</p>
                <p className="text-[10px]">Credits are minted on-chain after project verification by NCCR.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {credits.slice(0, 3).map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-medium">
                    <div>
                      <span className="font-bold text-slate-900 block font-mono">{c.tokenId || c.id.substring(0, 8)}</span>
                      <span className="text-[10px] text-slate-500">{c.project?.projectName || "Sundarbans Project"}</span>
                    </div>
                    <span className="font-extrabold text-emerald-700">{c.quantity} tCO₂e</span>
                  </div>
                ))}
              </div>
            )}

            <Link
              to="/dashboard/credits"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 pt-1"
            >
              View Full Token Portfolio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-2xl space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <h4 className="font-heading text-sm font-extrabold">Sentinel-2 Satellite MRV</h4>
            </div>
            <p className="text-xs text-slate-300">
              Monitor 10m spatial resolution multispectral canopy reflectance and GEE spectral vegetation indices.
            </p>
            <Link
              to="/dashboard/monitoring"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition inline-flex items-center gap-1.5"
            >
              Open Satellite Engine <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
