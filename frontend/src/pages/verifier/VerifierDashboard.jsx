import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verificationService } from "../../services/verificationService";
import {
  ClipboardList, CheckCircle, XCircle, Award, ShieldCheck,
  MapPin, Clock, ArrowRight, Satellite, FileText, FileSearch, Loader2,
} from "lucide-react";

export function VerifierDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pendingVerifications: 0,
    approvedCount: 0,
    totalProjects: 0,
    verifiedHectares: 0,
  });
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, projectsData] = await Promise.all([
          verificationService.getDashboardStats().catch(() => ({})),
          verificationService.getPendingProjects().catch(() => []),
        ]);
        if (statsData) setStats(statsData);
        if (projectsData) setPendingProjects(projectsData);
      } catch (err) {
        console.error("Verifier Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={<ClipboardList size={22} color="#0F4C81" />}
          iconBg="#eff6ff"
          label="Pending Verification"
          value={stats.pendingVerifications || pendingProjects.length || "0"}
          sub="Projects awaiting audit"
          accentBar="#0F4C81"
        />
        <KPICard
          icon={<CheckCircle size={22} color="#22A06B" />}
          iconBg="#e9f8f1"
          label="Approved Sites"
          value={stats.approvedCount || "0"}
          sub="Official verifier decisions"
          accentBar="#22A06B"
        />
        <KPICard
          icon={<Award size={22} color="#7c3aed" />}
          iconBg="#f3eeff"
          label="Verified Area"
          value={stats.verifiedHectares ? `${stats.verifiedHectares} Ha` : "0.00 Ha"}
          sub="Hectares of coastal wetland"
          accentBar="#7c3aed"
        />
        <KPICard
          icon={<ShieldCheck size={22} color="#22A06B" />}
          iconBg="#e9f8f1"
          label="Platform Verification Status"
          value="Active Audit"
          sub="NCCR & MoES Compliance"
          subColor="#22A06B"
          accentBar="#22A06B"
        />
      </div>

      {/* ── Projects Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base font-extrabold text-slate-900">
              Submitted Projects Awaiting Verification
            </h3>
            <p className="text-xs text-slate-500 font-medium">Review spatial GeoJSON boundaries, satellite telemetry, and ground evidence.</p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
            <span className="text-xs font-medium">Loading pending verification queue...</span>
          </div>
        ) : pendingProjects.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 font-medium">
            No submitted projects pending verification at this time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 uppercase text-[10px] text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="p-3.5 pl-5">Project Name</th>
                  <th className="p-3.5">NGO Organization</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Area (Ha)</th>
                  <th className="p-3.5">Submitted On</th>
                  <th className="p-3.5 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {pendingProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3.5 pl-5 font-bold text-slate-900">
                      {p.name || p.projectName}
                      <span className="block text-[10px] font-normal text-slate-400">{p.ecosystemType}</span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {p.owner?.organizationName || p.owner?.fullName || "NGO Partner"}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.district}, {p.state}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">{p.areaHectares} Ha</td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        onClick={() => navigate(`/verifier/projects/${p.id}`)}
                        className="px-3.5 py-1.5 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Review Site
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({ icon, iconBg, label, value, sub, subColor, accentBar }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2" style={{ borderLeft: `4px solid ${accentBar}` }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>{icon}</div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
      <span className="font-heading text-xl font-extrabold text-slate-900 block">{value}</span>
      <span className="text-[10px] font-medium block" style={{ color: subColor || "#64748b" }}>{sub}</span>
    </div>
  );
}
