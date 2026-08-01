import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Badge } from "../components/common/Badge";
import { Card } from "../components/Card";
import {
  FolderKanban,
  Maximize2,
  Award,
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  FileUp,
  LineChart as LineChartIcon,
  FileSpreadsheet,
  MessageSquare,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "NGO";

  const [projects] = useState([
    {
      id: "proj-1",
      name: "Sundarbans Delta Mangrove Restoration",
      state: "West Bengal",
      district: "South 24 Parganas",
      ecosystem: "Mangrove",
      area: "120 Ha",
      status: "In Verification",
      lastInspection: "2026-07-28",
    },
    {
      id: "proj-2",
      name: "Mahanadi Mangrove Ecosystem Revival",
      state: "Odisha",
      district: "Kendrapara",
      ecosystem: "Mangrove",
      area: "85 Ha",
      status: "Active",
      lastInspection: "2026-07-22",
    },
    {
      id: "proj-3",
      name: "Pichavaram Coastal Wetland Preservation",
      state: "Tamil Nadu",
      district: "Cuddalore",
      ecosystem: "Salt Marsh",
      area: "145 Ha",
      status: "Credits Issued",
      lastInspection: "2026-07-15",
    },
    {
      id: "proj-4",
      name: "Gulf of Kutch Seagrass Meadow Project",
      state: "Gujarat",
      district: "Jamnagar",
      ecosystem: "Seagrass",
      area: "100 Ha",
      status: "Draft",
      lastInspection: "2026-07-10",
    },
  ]);

  return (
    <div className="space-y-5">

      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900">
              Welcome back, {user?.fullName || "Dr. AP Sharma (Admin)"}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              {role}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {user?.organizationName || "Ministry of Earth Sciences (MoES)"} — Platform ID: <span className="font-mono text-slate-700 font-bold">{user?.id?.slice(0, 8) || "586db0b7"}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#22A06B] hover:bg-[#1A7A52] text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer">
            <PlusCircle className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Top 5 Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <MetricCard
          title="ACTIVE PROJECTS"
          value="12"
          subtext="4 States in India"
          icon={<FolderKanban className="w-4 h-4 text-emerald-600" />}
        />
        <MetricCard
          title="TOTAL AREA"
          value="450 Ha"
          subtext="Coastal Mangroves & Marshes"
          icon={<Maximize2 className="w-4 h-4 text-blue-600" />}
        />
        <MetricCard
          title="ESTIMATED CREDITS"
          value="15,400"
          subtext="tCO₂e Potential"
          icon={<Award className="w-4 h-4 text-amber-600" />}
        />
        <MetricCard
          title="CREDITS VERIFIED"
          value="11,200"
          subtext="NCCR Verified & Tokenized"
          icon={<ShieldCheck className="w-4 h-4 text-teal-600" />}
        />
        <MetricCard
          title="TOTAL IMPACT"
          value="+24.5%"
          subtext="Mean NDVI Growth Trend"
          icon={<TrendingUp className="w-4 h-4 text-cyan-600" />}
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-5">

          {/* Satellite NDVI Analytics Card */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  Satellite NDVI Growth Analytics
                </h3>
                <p className="text-[11px] text-slate-500">Google Earth Engine Sentinel-2 Spectral Indices</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Feed Active
              </span>
            </div>

            {/* 7 Vertical Green Bars Graph */}
            <div className="space-y-2">
              <div className="h-36 flex items-end justify-between gap-3 px-2 bg-slate-50 rounded-xl border border-slate-100 p-4">
                {[0.32, 0.41, 0.48, 0.59, 0.68, 0.76, 0.84].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-slate-600">{val}</span>
                    <div
                      className="w-full bg-[#22A06B] rounded-t-sm transition-all hover:brightness-110"
                      style={{ height: `${val * 100}%` }}
                    />
                    <span className="text-[10px] text-slate-400 font-mono">Month {idx + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>NDVI Index Range: <strong className="text-slate-700">0.0 (Bare Soil) to 1.0 (Dense Canopy)</strong></span>
                <span className="text-emerald-700 font-bold">Target Canopy: Achieved</span>
              </div>
            </div>
          </Card>

          {/* Projects Portfolio Table */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-sm font-bold text-slate-900">
                  My Projects Portfolio
                </h3>
                <p className="text-[11px] text-slate-500">Active Blue Carbon restoration sites</p>
              </div>
              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All ↗
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                    <th className="p-3">PROJECT NAME</th>
                    <th className="p-3">ECOSYSTEM</th>
                    <th className="p-3">AREA</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">LAST INSPECTION</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-bold text-slate-900">
                        <div>{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" /> {p.district}, {p.state}
                        </div>
                      </td>
                      <td className="p-3 font-medium">{p.ecosystem}</td>
                      <td className="p-3 font-bold">{p.area}</td>
                      <td className="p-3">
                        <Badge variant={p.status}>{p.status}</Badge>
                      </td>
                      <td className="p-3 text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {p.lastInspection}
                      </td>
                      <td className="p-3 text-right">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">

          {/* Recent Activities Timeline */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading text-sm font-bold text-slate-900">
                Recent Activities
              </h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              <ActivityItem
                title="Satellite Report Generated"
                desc="Sentinel-2 GEE report for Sundarbans Delta"
                time="2 hours ago"
              />
              <ActivityItem
                title="Verifier Inspection Approved"
                desc="NCCR approved Mahanadi Mangrove site"
                time="1 day ago"
              />
              <ActivityItem
                title="Document Uploaded"
                desc="GeoJSON boundary submitted for Pichavaram"
                time="3 days ago"
              />
            </div>
          </Card>

          {/* Quick Actions Grid Card */}
          <Card className="bg-[#475569] text-white p-4 space-y-3 border-slate-600">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <ShortcutButton icon={<FileUp className="w-4 h-4 text-emerald-400" />} label="Upload Document" />
              <ShortcutButton icon={<LineChartIcon className="w-4 h-4 text-cyan-400" />} label="Monitoring Data" />
              <ShortcutButton icon={<FileSpreadsheet className="w-4 h-4 text-blue-400" />} label="Generate Report" />
              <ShortcutButton icon={<MessageSquare className="w-4 h-4 text-amber-400" />} label="Connect Verifier" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtext, icon }) {
  return (
    <Card className="p-3.5 flex flex-col justify-between hover:border-slate-300 transition">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-1 bg-slate-50 rounded border border-slate-100">{icon}</div>
      </div>
      <div>
        <span className="font-heading text-xl font-extrabold text-slate-900 block leading-tight">{value}</span>
        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{subtext}</span>
      </div>
    </Card>
  );
}

function ActivityItem({ title, desc, time }) {
  return (
    <div className="flex items-start gap-2.5 text-xs">
      <div className="w-2 h-2 rounded-full bg-[#22A06B] mt-1.5 shrink-0" />
      <div>
        <h4 className="font-bold text-slate-900 leading-tight">{title}</h4>
        <p className="text-slate-500 text-[11px] mt-0.5">{desc}</p>
        <span className="text-[10px] text-slate-400 block mt-0.5">{time}</span>
      </div>
    </div>
  );
}

function ShortcutButton({ icon, label }) {
  return (
    <button className="p-2.5 bg-slate-700/80 hover:bg-slate-700 rounded-lg border border-slate-600 flex flex-col items-center text-center gap-1 transition cursor-pointer">
      {icon}
      <span className="text-[11px] font-semibold text-slate-200">{label}</span>
    </button>
  );
}
