import { useState, useEffect } from "react";
import { projectService } from "../../services/projectService";
import { creditService } from "../../services/creditService";
import { Badge } from "../../components/Badge";
import {
  BarChart3, TrendingUp, Award, FolderKanban, ShieldCheck,
  Users, MapPin, Loader2, Globe, FileText
} from "lucide-react";

export function AdminAnalyticsPage() {
  const [projects, setProjects] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalyticsData() {
      setLoading(true);
      try {
        const [projData, creditData] = await Promise.all([
          projectService.getAllProjects().catch(() => []),
          creditService.getAllCredits().catch(() => []),
        ]);
        setProjects(projData);
        setCredits(creditData);
      } catch (err) {
        console.error("Failed to load admin analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalyticsData();
  }, []);

  // Aggregated analytics metrics
  const totalProjects = projects.length;
  const totalHectares = projects.reduce((sum, p) => sum + (parseFloat(p.areaHectares) || 0), 0);
  const totalCredits = credits.reduce((sum, c) => sum + (parseFloat(c.quantity) || 0), 0);
  const approvedCount = projects.filter((p) => p.status === "APPROVED").length;
  const pendingCount = projects.filter((p) => p.status === "SUBMITTED" || p.status === "UNDER_VERIFICATION").length;

  // Ecosystem type breakdown
  const ecosystemCounts = projects.reduce((acc, p) => {
    const type = p.ecosystemType || "MANGROVE";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">National Blue Carbon Analytics &amp; MRV Intelligence</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          High-level analytics covering platform sequestration, verification velocity, and Polygon Amoy tokenomics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Area Under MRV</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalHectares.toFixed(2)} Ha</span>
          <span className="text-[10px] font-bold text-blue-700 block">Sentinel-2 Surface Reflectance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-purple-600">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tokenized Sequestration</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{totalCredits.toLocaleString()} tCO₂e</span>
          <span className="text-[10px] font-bold text-purple-700 block">Polygon Amoy ERC-1155</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approved Restoration Sites</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{approvedCount} Sites</span>
          <span className="text-[10px] font-bold text-emerald-700 block">NCCR Compliance Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-amber-600">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audit Queue Velocity</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{pendingCount} Pending</span>
          <span className="text-[10px] font-bold text-amber-700 block">Under Active Review</span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ecosystem Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" /> Ecosystem Type Distribution
          </h3>

          {loading ? (
            <div className="p-8 text-center text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
            </div>
          ) : Object.keys(ecosystemCounts).length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No ecosystem data available.</div>
          ) : (
            <div className="space-y-3">
              {Object.entries(ecosystemCounts).map(([type, count]) => {
                const percentage = ((count / totalProjects) * 100).toFixed(0);
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>{type}</span>
                      <span>{count} Projects ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Verification Funnel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-heading text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> Project Verification Funnel
          </h3>

          <div className="space-y-3">
            {[
              { label: "Submitted Projects", count: projects.filter(p=>p.status==="SUBMITTED").length, color: "bg-blue-500" },
              { label: "Under Verification Audit", count: projects.filter(p=>p.status==="UNDER_VERIFICATION").length, color: "bg-amber-500" },
              { label: "Approved & Verified", count: approvedCount, color: "bg-emerald-500" },
              { label: "Draft Projects", count: projects.filter(p=>p.status==="DRAFT").length, color: "bg-slate-400" },
            ].map((f) => {
              const pct = totalProjects > 0 ? ((f.count / totalProjects) * 100).toFixed(0) : 0;
              return (
                <div key={f.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${f.color}`} />
                    <span className="font-bold text-slate-800">{f.label}</span>
                  </div>
                  <span className="font-mono text-slate-600">{f.count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
