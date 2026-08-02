import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ClipboardList, CheckCircle, XCircle, Award, ShieldCheck,
  MapPin, Clock, Eye, ArrowRight, TrendingUp, Satellite,
  FileText, FileSearch, AlertCircle, ChevronDown,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────── */
const PROJECTS = {
  pending: [
    { id: "vp-1", name: "Sundarbans Restoration", type: "Mangrove Restoration", ngo: "GreenCoast NGO", location: "West Bengal, India", area: 1250, estCredits: 12450, submittedOn: "2h ago", img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80" },
    { id: "vp-2", name: "Gahirmatha Mangrove", type: "Mangrove Conservation", ngo: "BluePlanet Foundation", location: "Odisha, India", area: 850, estCredits: 8320, submittedOn: "1d ago", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80" },
    { id: "vp-3", name: "Kadathundi Coastline", type: "Seagrass Restoration", ngo: "Coastal Guardians", location: "Tamil Nadu, India", area: 600, estCredits: 6210, submittedOn: "2d ago", img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=80&q=80" },
    { id: "vp-4", name: "Andaman Blue Carbon", type: "Mangrove Restoration", ngo: "Island Conservation", location: "Andaman, India", area: 920, estCredits: 9150, submittedOn: "3d ago", img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=80&q=80" },
    { id: "vp-5", name: "Gulf of Mannar Seagrass", type: "Seagrass Restoration", ngo: "Marine Life Trust", location: "Tamil Nadu, India", area: 470, estCredits: 4780, submittedOn: "4d ago", img: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?w=80&q=80" },
    { id: "vp-6", name: "Mahanadi Coastline", type: "Mangrove Conservation", ngo: "Eco Warriors India", location: "Odisha, India", area: 540, estCredits: 5100, submittedOn: "5d ago", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&q=80" },
    { id: "vp-7", name: "Lakshadweep Marine Zone", type: "Coral Reef", ngo: "Ocean Guardians", location: "Lakshadweep, India", area: 310, estCredits: 2850, submittedOn: "1w ago", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&q=80" },
  ],
  accepted: [
    { id: "va-1", name: "Pichavaram Wetland", type: "Salt Marsh", ngo: "Tamil Eco Trust", location: "Tamil Nadu, India", area: 490, estCredits: 4850, submittedOn: "1mo ago", img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=80&q=80" },
    { id: "va-2", name: "Gujarat Mangrove Belt", type: "Mangrove", ngo: "Gujarat Green", location: "Gujarat, India", area: 1100, estCredits: 11200, submittedOn: "2mo ago", img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80" },
  ],
  rejected: [
    { id: "vr-1", name: "Chilika Wetland", type: "Wetland", ngo: "Odisha Eco", location: "Odisha, India", area: 210, estCredits: 2100, submittedOn: "3mo ago", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80" },
  ],
};

const TASKS = [
  { label: "Satellite Analysis", desc: "Pending analysis", icon: <Satellite size={16} color="#0F4C81" />, bg: "#eff6ff", count: 5 },
  { label: "Document Verification", desc: "Pending review", icon: <FileText size={16} color="#22A06B" />, bg: "#e9f8f1", count: 7 },
  { label: "Field Data Validation", desc: "Pending validation", icon: <FileSearch size={16} color="#d97706" />, bg: "#fff8e6", count: 3 },
  { label: "Reports to Generate", desc: "Pending reports", icon: <ClipboardList size={16} color="#7c3aed" />, bg: "#f3eeff", count: 2 },
];

const ACTIVITY = [
  { project: "Sundarbans Restoration", action: "Document verified", time: "2h ago" },
  { project: "Gahirmatha Mangrove", action: "Satellite analysis completed", time: "4h ago" },
  { project: "Kadathundi Coastline", action: "Verification started", time: "1d ago" },
  { project: "Andaman Blue Carbon", action: "Documents submitted", time: "2d ago" },
];

const WORKFLOW = [
  { step: 1, title: "Review Project", desc: "Check project overview and documents" },
  { step: 2, title: "Verify Documents", desc: "Validate submitted documents" },
  { step: 3, title: "Analyze Satellite Data", desc: "Review satellite imagery and data" },
  { step: 4, title: "Field Data Validation", desc: "Verify field data and methodology" },
  { step: 5, title: "Make Decision", desc: "Accept or reject the project" },
];

const TABS = [
  { key: "pending",  label: "Pending",  count: PROJECTS.pending.length },
  { key: "accepted", label: "Accepted", count: 23 },
  { key: "rejected", label: "Rejected", count: 5 },
  { key: "all",      label: "All Projects" },
];

/* ── Component ─────────────────────────────────────────── */
export function VerifierDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const tableData = activeTab === "all"
    ? [...PROJECTS.pending, ...PROJECTS.accepted, ...PROJECTS.rejected]
    : PROJECTS[activeTab] || PROJECTS.pending;

  return (
    <div>
      {/* ── KPI Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard
          icon={<ClipboardList size={22} color="#0F4C81" />}
          iconBg="#eff6ff"
          label="Pending Verification"
          value="7"
          sub="Projects awaiting review"
          accentBar="#0F4C81"
        />
        <KPICard
          icon={<CheckCircle size={22} color="#22A06B" />}
          iconBg="#e9f8f1"
          label="Accepted Projects"
          value="23"
          sub="Total accepted"
          accentBar="#22A06B"
        />
        <KPICard
          icon={<XCircle size={22} color="#ef4444" />}
          iconBg="#fee2e2"
          label="Rejected Projects"
          value="5"
          sub="Total rejected"
          accentBar="#ef4444"
        />
        <KPICard
          icon={<Award size={22} color="#7c3aed" />}
          iconBg="#f3eeff"
          label="Total Verified Credits"
          value="12.45K"
          sub="tCO₂e · Across all accepted projects"
          accentBar="#7c3aed"
          unit="tCO₂e"
        />
        <KPICard
          icon={<ShieldCheck size={22} color="#22A06B" />}
          iconBg="#e9f8f1"
          label="Verification Accuracy"
          value="98.6%"
          sub="Excellent"
          subColor="#22A06B"
          accentBar="#22A06B"
        />
      </div>

      {/* ── Body Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 24 }}>

        {/* ── Main — Projects table ── */}
        <div className="db-card">
          <div className="db-card-header">
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Projects Awaiting Verification</h3>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ padding: "12px 20px 0", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", gap: 0 }}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "8px 16px", fontSize: 13,
                    fontWeight: activeTab === tab.key ? 700 : 500,
                    color: activeTab === tab.key ? "#22A06B" : "#64748b",
                    background: "transparent", border: "none",
                    borderBottom: activeTab === tab.key ? "2px solid #22A06B" : "2px solid transparent",
                    cursor: "pointer", transition: "all .15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}{tab.count != null ? ` (${tab.count})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>NGO / Organization</th>
                  <th>Location</th>
                  <th>Area (ha)</th>
                  <th>Est. Credits (tCO₂e)</th>
                  <th>Submitted On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="db-table-thumb">
                          <img src={p.img} alt={p.name} />
                        </div>
                        <div>
                          <div className="db-project-name">{p.name}</div>
                          <div className="db-project-sub">{p.type}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{p.ngo}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={12} color="#94a3b8" />
                        <span style={{ fontSize: 12, color: "#64748b" }}>{p.location}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: 13 }}>{p.area.toLocaleString()}</td>
                    <td style={{ fontWeight: 700, fontSize: 13 }}>{p.estCredits.toLocaleString()}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8", fontSize: 12 }}>
                        <Clock size={12} /> {p.submittedOn}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/verifier/projects/${p.id}`)}
                        style={{
                          padding: "5px 14px", background: "#22A06B", color: "white",
                          border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700,
                          cursor: "pointer", transition: "background .15s",
                        }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="db-view-all-row">
            <Link to="/verifier/projects" className="db-card-link">
              View all pending projects <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Verification Tasks */}
          <div className="db-card">
            <div className="db-card-header">
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Verification Tasks</h3>
            </div>
            <div style={{ padding: "8px 18px 14px" }}>
              {TASKS.map((t) => (
                <div key={t.label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 0", borderBottom: "1px solid #f8fafc",
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {t.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{t.desc}</div>
                  </div>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "#f1f5f9", fontSize: 11, fontWeight: 700,
                    color: "#475569", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {t.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="db-card">
            <div className="db-card-header">
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Recent Activity</h3>
              <Link to="/verifier/projects" className="db-card-link">View all</Link>
            </div>
            <div style={{ padding: "8px 18px 14px" }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  padding: "10px 0", borderBottom: "1px solid #f8fafc",
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22A06B", marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{a.project}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{a.action}</div>
                  </div>
                  <span style={{ fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap" }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Verification Workflow ── */}
      <div className="db-card">
        <div className="db-card-header">
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Verification Workflow</h3>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, overflow: "auto" }}>
            {WORKFLOW.map((step, i) => (
              <div key={step.step} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 140 }}>
                <div style={{ flex: 1, textAlign: "center", padding: "0 8px" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: i === 4 ? "#22A06B" : "#eff6ff",
                    border: `2px solid ${i === 4 ? "#22A06B" : "#bfdbfe"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 10px", fontSize: 14, fontWeight: 800,
                    color: i === 4 ? "white" : "#0F4C81",
                  }}>
                    {step.step}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <div style={{ color: "#94a3b8", flexShrink: 0, marginTop: -20 }}>
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon, iconBg, label, value, sub, subColor, accentBar, unit }) {
  return (
    <div className="db-kpi-card" style={{ borderLeft: `3px solid ${accentBar}`, borderRadius: "0 20px 20px 0" }}>
      <div className="db-kpi-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="db-kpi-label">{label}</div>
      <div className="db-kpi-value">
        {value}
        {unit && <small style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginLeft: 4 }}>{unit}</small>}
      </div>
      <div className="db-kpi-sub" style={{ color: subColor || undefined }}>{sub}</div>
    </div>
  );
}
