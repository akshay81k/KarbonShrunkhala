import { useState } from "react";
import { FileText, Download, Eye, Plus, Search, Filter, ArrowRight, TrendingUp } from "lucide-react";

const REPORTS = [
  { id: "R001", name: "Sundarbans Restoration Report", project: "Sundarbans Restoration", type: "MRV Report", date: "12 Jun 2025", size: "2.4 MB", status: "published" },
  { id: "R002", name: "Gahirmatha Mangrove Report",   project: "Gahirmatha Mangrove",   type: "MRV Report", date: "05 Jun 2025", size: "1.8 MB", status: "published" },
  { id: "R003", name: "Q2 Impact Summary",            project: "All Projects",            type: "Impact Report", date: "31 May 2025", size: "3.1 MB", status: "published" },
  { id: "R004", name: "Kadathundi Coastline Report",  project: "Kadathundi Coastline",   type: "MRV Report", date: "20 May 2025", size: "1.2 MB", status: "draft" },
  { id: "R005", name: "Q1 Platform Summary",          project: "All Projects",            type: "Impact Report", date: "30 Mar 2025", size: "2.9 MB", status: "published" },
];

export function ReportsPage() {
  const [search, setSearch] = useState("");

  const filtered = REPORTS.filter((r) =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Reports</h1>
          <p>Access your MRV monitoring and impact reports for all projects</p>
        </div>
        <button className="db-new-project-btn">
          <Plus size={14} /> Generate Report
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        {[
          { label: "Total Reports", value: "24", icon: <FileText size={20} color="#0F4C81" />, bg: "#eff6ff" },
          { label: "Published",     value: "18", icon: <TrendingUp size={20} color="#22A06B" />, bg: "#e9f8f1" },
          { label: "Pending Review",value: "6",  icon: <Eye size={20} color="#d97706" />,         bg: "#fff8e6" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Generate Report Banner */}
      <div style={{
        background: "linear-gradient(135deg,#0F4C81,#1e6fb5)",
        borderRadius: 20, padding: "24px 28px", marginBottom: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
        color: "white",
      }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>Generate a New Satellite Report</h3>
          <p style={{ fontSize: 13, opacity: .85, margin: 0, lineHeight: 1.5 }}>
            Request a fresh Sentinel-2 NDVI analysis from Google Earth Engine for any of your active projects.
          </p>
        </div>
        <button style={{
          padding: "10px 20px", background: "rgba(255,255,255,.15)",
          border: "1px solid rgba(255,255,255,.3)", borderRadius: 10,
          color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer",
          whiteSpace: "nowrap", transition: "background .18s",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          Request Analysis <ArrowRight size={14} />
        </button>
      </div>

      {/* Filter + Table */}
      <div className="db-card">
        <div style={{ padding: "16px 20px", display: "flex", gap: 12, borderBottom: "1px solid #f1f5f9" }}>
          <div className="db-searchbar" style={{ flex: 1 }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="db-filter-btn"><Filter size={14} /> Filter</button>
        </div>

        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Project</th>
                <th>Type</th>
                <th>Date</th>
                <th>Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FileText size={14} color="#ef4444" />
                      </div>
                      <span style={{ fontWeight: 600 }}>{r.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{r.project}</td>
                  <td>
                    <span style={{ padding: "2px 8px", background: "#f1f5f9", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#475569" }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{r.date}</td>
                  <td style={{ fontSize: 12 }}>{r.size}</td>
                  <td>
                    <span className={`db-status ${r.status === "published" ? "approved" : "pending"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="db-view-btn"><Eye size={12} /> View</button>
                      <button className="db-view-btn"><Download size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
