import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FolderKanban, Maximize2, Award, ShieldCheck, TrendingUp,
  PlusCircle, Upload, FileSpreadsheet, Eye, ArrowRight,
  MapPin, Clock, FileText, ChevronDown, ArrowUpRight,
  Headphones,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────── */
const PROJECTS = {
  submitted: [
    {
      id: "proj-1",
      name: "Sundarbans Restoration",
      type: "Mangrove Restoration",
      location: "West Bengal, India",
      area: "1,250 ha",
      estCredits: "12,450 tCO₂e",
      status: "submitted",
      lastUpdated: "2h ago",
      img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80",
    },
    {
      id: "proj-2",
      name: "Gahirmatha Mangrove",
      type: "Mangrove Conservation",
      location: "Odisha, India",
      area: "850 ha",
      estCredits: "8,320 tCO₂e",
      status: "submitted",
      lastUpdated: "1d ago",
      img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80",
    },
    {
      id: "proj-3",
      name: "Kadathundi Coastline",
      type: "Seagrass Restoration",
      location: "Tamil Nadu, India",
      area: "600 ha",
      estCredits: "6,210 tCO₂e",
      status: "submitted",
      lastUpdated: "3d ago",
      img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=80&q=80",
    },
  ],
  pending: [
    {
      id: "proj-4",
      name: "Mahanadi Mangroves",
      type: "Mangrove Restoration",
      location: "Odisha, India",
      area: "720 ha",
      estCredits: "7,900 tCO₂e",
      status: "pending",
      lastUpdated: "5d ago",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&q=80",
    },
    {
      id: "proj-5",
      name: "Pichavaram Wetland",
      type: "Salt Marsh Conservation",
      location: "Tamil Nadu, India",
      area: "490 ha",
      estCredits: "4,850 tCO₂e",
      status: "pending",
      lastUpdated: "1w ago",
      img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&q=80",
    },
    {
      id: "proj-6",
      name: "Gulf of Kutch Seagrass",
      type: "Seagrass Meadow",
      location: "Gujarat, India",
      area: "380 ha",
      estCredits: "3,210 tCO₂e",
      status: "pending",
      lastUpdated: "2w ago",
      img: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?w=80&q=80",
    },
  ],
  rejected: [
    {
      id: "proj-7",
      name: "Chilika Wetland Project",
      type: "Wetland Restoration",
      location: "Odisha, India",
      area: "210 ha",
      estCredits: "2,100 tCO₂e",
      status: "rejected",
      lastUpdated: "3w ago",
      img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=80&q=80",
    },
    {
      id: "proj-8",
      name: "Andaman Coral Reef",
      type: "Coral Reef Protection",
      location: "Andaman & Nicobar",
      area: "150 ha",
      estCredits: "1,540 tCO₂e",
      status: "rejected",
      lastUpdated: "1mo ago",
      img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=80&q=80",
    },
  ],
};

const REPORTS = [
  { name: "Sundarbans Restoration Report", date: "12 Jun 2025" },
  { name: "Gahirmatha Mangrove Report", date: "05 Jun 2025" },
  { name: "Q2 Impact Summary", date: "31 May 2025" },
];

/* ── Component ─────────────────────────────────────────── */
export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("submitted");

  const currentProjects = PROJECTS[activeTab] || [];

  return (
    <div>
      {/* ── KPI Cards ── */}
      <div className="db-kpi-grid">
        <KPICard
          icon={<FolderKanban size={20} color="#22A06B" />}
          iconBg="#E9F8F1"
          label="Total Projects"
          value="8"
          sub="Across 3 statuses"
          trend="+2"
          trendDir="up"
        />
        <KPICard
          icon={<Maximize2 size={20} color="#0F4C81" />}
          iconBg="#EFF6FF"
          label="Total Area"
          value="1,250 ha"
          sub="Across 2 locations"
          trend="stable"
          trendDir="neutral"
        />
        <KPICard
          icon={<Award size={20} color="#7c3aed" />}
          iconBg="#F3EEFF"
          label="Estimated Credits"
          value="12.45K"
          sub="tCO₂e"
          trend="↑ 18.7% vs last 6 months"
          trendDir="up"
        />
        <KPICard
          icon={<ShieldCheck size={20} color="#0891b2" />}
          iconBg="#E0F7FF"
          label="Credits Verified"
          value="2.46K"
          sub="tCO₂e · Verified & Issued"
          trend="↑ 12.4%"
          trendDir="up"
        />
        <KPICard
          icon={<TrendingUp size={20} color="#d97706" />}
          iconBg="#FFF8E6"
          label="Impact Accuracy"
          value="98%"
          sub="Verification Accuracy"
          trend="↑ 3.2%"
          trendDir="up"
        />
      </div>

      {/* ── Body Grid ── */}
      <div className="db-body-grid">

        {/* ── Left / Main Column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Projects Section */}
          <div className="db-card">
            <div className="db-card-header">
              <div>
                <h3>Your Projects</h3>
              </div>
              <Link to="/dashboard/projects" className="db-new-project-btn" style={{ fontSize: 12 }}>
                <PlusCircle size={13} /> New Project
              </Link>
            </div>

            {/* Tabs */}
            <div style={{ padding: "14px 22px 0" }}>
              <div className="db-tabs">
                {[
                  { key: "submitted", label: "Submitted", count: PROJECTS.submitted.length },
                  { key: "pending",   label: "Pending",   count: PROJECTS.pending.length },
                  { key: "rejected",  label: "Rejected",  count: PROJECTS.rejected.length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`db-tab${activeTab === tab.key ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    <span className="db-tab-count">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="db-table-wrap" style={{ marginTop: 4 }}>
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Area</th>
                    <th>Est. Credits</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((p) => (
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
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <MapPin size={12} color="#94a3b8" />
                          <span style={{ fontSize: 12, color: "#64748b" }}>{p.location}</span>
                        </div>
                      </td>
                      <td><span style={{ fontWeight: 600 }}>{p.area}</span></td>
                      <td><span style={{ fontWeight: 600 }}>{p.estCredits}</span></td>
                      <td><span className={`db-status ${p.status}`}>{p.status}</span></td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8", fontSize: 12 }}>
                          <Clock size={12} /> {p.lastUpdated}
                        </div>
                      </td>
                      <td>
                        <button
                          className="db-view-btn"
                          onClick={() => navigate(`/dashboard/projects/${p.id}`)}
                        >
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="db-view-all-row">
              <Link to="/dashboard/projects" className="db-card-link">
                View all projects <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="db-quick-actions">
            <QuickAction
              icon={<PlusCircle size={20} color="#22A06B" />}
              iconBg="#E9F8F1"
              title="New Project"
              desc="Register a new blue carbon project"
              to="/dashboard/projects"
            />
            <QuickAction
              icon={<Upload size={20} color="#0F4C81" />}
              iconBg="#EFF6FF"
              title="Upload Document"
              desc="Submit project documents and evidence"
              to="/dashboard/documents"
            />
            <QuickAction
              icon={<FileSpreadsheet size={20} color="#7c3aed" />}
              iconBg="#F3EEFF"
              title="Generate Report"
              desc="Create project reports for verification"
              to="/dashboard/reports"
            />
            <QuickAction
              icon={<Award size={20} color="#d97706" />}
              iconBg="#FFF8E6"
              title="View Credits"
              desc="Track your credits and history"
              to="/dashboard/credits"
            />
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="db-right-panel">

          {/* Credits Summary */}
          <div className="db-card">
            <div className="db-card-header">
              <div>
                <h3>Credits Summary</h3>
              </div>
              <button className="db-date-filter" style={{ fontSize: 11, padding: "5px 10px" }}>
                This Year <ChevronDown size={11} />
              </button>
            </div>
            <div className="db-card-body">
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginBottom: 2 }}>Total Credits</div>
              <div className="db-credits-total">
                12.45K <small style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>tCO₂e</small>
                <span className="db-credits-up" style={{ fontSize: 12, marginLeft: 8 }}>
                  <TrendingUp size={11} /> 18.7%
                </span>
              </div>
              <div className="db-credits-row">
                <span className="db-credits-label">Verified Credits</span>
                <div>
                  <span className="db-credits-val">2.46K tCO₂e</span>
                  <span className="db-credits-up"><TrendingUp size={10} /> 12.4%</span>
                </div>
              </div>
              <div className="db-credits-row">
                <span className="db-credits-label">Issued Credits</span>
                <div>
                  <span className="db-credits-val">2.10K tCO₂e</span>
                  <span className="db-credits-up"><TrendingUp size={10} /> 10.3%</span>
                </div>
              </div>
              <Link to="/dashboard/credits" className="db-card-link" style={{ marginTop: 14, display: "flex" }}>
                View credit history <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="db-card">
            <div className="db-card-header">
              <h3>Recent Reports</h3>
              <Link to="/dashboard/reports" className="db-card-link">View all</Link>
            </div>
            <div className="db-card-body" style={{ paddingTop: 8 }}>
              {REPORTS.map((r) => (
                <div key={r.name} className="db-report-item">
                  <div className="db-report-icon">
                    <FileText size={16} color="#ef4444" />
                  </div>
                  <div>
                    <div className="db-report-name">{r.name}</div>
                    <div className="db-report-date">{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="db-help-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h4>Need Help?</h4>
                <p>Contact our support team for assistance with your projects.</p>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(3,105,161,.15)", flexShrink: 0,
              }}>
                <Headphones size={20} color="#0369a1" />
              </div>
            </div>
            <button className="db-help-btn" onClick={() => navigate("/dashboard/help")}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */
function KPICard({ icon, iconBg, label, value, sub, trend, trendDir }) {
  return (
    <div className="db-kpi-card">
      <div className="db-kpi-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="db-kpi-label">{label}</div>
      <div className="db-kpi-value">{value}</div>
      <div className="db-kpi-sub">{sub}</div>
      {trend && (
        <div className={`db-kpi-trend ${trendDir}`}>
          {trendDir === "up" && <ArrowUpRight size={11} />}
          {trend}
        </div>
      )}
    </div>
  );
}

function QuickAction({ icon, iconBg, title, desc, to }) {
  const navigate = useNavigate();
  return (
    <div className="db-quick-card" onClick={() => navigate(to)} style={{ cursor: "pointer" }}>
      <div className="db-quick-icon" style={{ background: iconBg }}>{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="db-quick-arrow">
        <ArrowRight size={14} />
      </div>
    </div>
  );
}
