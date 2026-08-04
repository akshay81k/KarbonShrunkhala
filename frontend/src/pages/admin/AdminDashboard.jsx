import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { creditService } from "../../services/creditService";
import { Badge } from "../../components/Badge";
import {
  Users, UserCheck, FolderKanban, Award, ShieldAlert,
  ArrowRight, Activity, Globe, Clock, CheckCircle, Loader2
} from "lucide-react";

export function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [credits, setCredits] = useState([]);
  const [verifiersCount, setVerifiersCount] = useState(0);
  const [ngosCount, setNgosCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminStats = async () => {
      setLoading(true);
      try {
        const [projData, creditData] = await Promise.all([
          projectService.getAllProjects().catch(() => []),
          creditService.getAllCredits().catch(() => []),
        ]);
        setProjects(projData);
        setCredits(creditData);

        // Fetch verifiers count
        const vRes = await fetch("/api/admin/verifiers").catch(() => null);
        if (vRes && vRes.ok) {
          const vJson = await vRes.json();
          setVerifiersCount((vJson.data || vJson || []).length);
        }

        // Distinct NGO owners count
        const uniqueNgos = new Set(projData.map((p) => p.ownerId).filter(Boolean));
        setNgosCount(uniqueNgos.size || 1);
      } catch (err) {
        console.error("Admin dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAdminStats();
  }, []);

  const totalProjects = projects.length;
  const pendingCount = projects.filter((p) => p.status === "SUBMITTED" || p.status === "UNDER_VERIFICATION").length;
  const totalCredits = credits.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">Government System Overview</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Platform monitoring, Blue Carbon projects, and Polygon Amoy tokenomics</p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered NGOs</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{ngosCount}</span>
          <span className="text-[10px] font-bold text-blue-700 block">Registered Organizations</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Verifiers</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{verifiersCount}</span>
          <span className="text-[10px] font-bold text-emerald-700 block">Corporate Auditors</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-amber-600">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Projects</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalProjects}</span>
          <span className="text-[10px] font-bold text-amber-700 block">{pendingCount} Pending Verification</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tokenized Credits</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalCredits.toLocaleString()} tCO₂e</span>
          <span className="text-[10px] font-bold text-purple-700 block">Polygon Amoy Testnet</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Projects Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-heading text-sm font-extrabold text-slate-900">Recent Platform Projects</h3>
            <Link to="/admin/projects" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">View all</Link>
          </div>

          <div className="p-4 flex-1">
            {loading ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                <span className="text-xs font-medium">Loading real projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">No projects submitted yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                    <tr>
                      <th className="p-3 pl-4">Project Name</th>
                      <th className="p-3">Ecosystem</th>
                      <th className="p-3">State</th>
                      <th className="p-3 text-right pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {projects.slice(0, 5).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3 pl-4 font-bold text-slate-900">{p.projectName || p.name}</td>
                        <td className="p-3 text-slate-600">{p.ecosystemType}</td>
                        <td className="p-3 text-slate-500">{p.state}</td>
                        <td className="p-3 text-right pr-4">
                          <Badge variant={p.status}>{p.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Recent Token Batches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading text-sm font-extrabold text-slate-900">Recent ERC-1155 Token Batches</h3>
          {credits.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
              No carbon credits minted on-chain yet.
            </div>
          ) : (
            <div className="space-y-2">
              {credits.slice(0, 4).map((c) => (
                <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-mono text-slate-900 block">{c.tokenId || c.id.substring(0, 8)}</span>
                    <span className="text-[10px] text-slate-500">{c.project?.projectName || "Sundarbans Site"}</span>
                  </div>
                  <span className="font-extrabold text-emerald-700">{c.quantity} tCO₂e</span>
                </div>
              ))}
            </div>
          )}
          <Link to="/admin/credits" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1">
            View All Credits <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
