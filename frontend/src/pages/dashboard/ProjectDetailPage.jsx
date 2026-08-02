import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Calendar, Award, ShieldCheck, FileText,
  TrendingUp, CheckCircle, Clock, AlertCircle, ExternalLink,
  Download, Upload,
} from "lucide-react";

const PROJECTS_DB = {
  "proj-1": {
    name: "Sundarbans Restoration",
    type: "Mangrove Restoration",
    location: "West Bengal, India",
    coords: "21.9497° N, 88.8750° E",
    area: "1,250 ha",
    estCredits: "12,450 tCO₂e",
    verifiedCredits: "2,460 tCO₂e",
    status: "submitted",
    startDate: "Jan 2024",
    lastUpdated: "2 hours ago",
    description: "Large-scale mangrove restoration project in the Sundarbans delta covering 1,250 hectares across South 24 Parganas district. This project focuses on replanting native mangrove species, protecting existing ecosystems, and restoring coastal biodiversity while generating verified blue carbon credits.",
    ecosystem: "Mangrove",
    methodology: "VM0033 – Blue Carbon Methodology",
    verifier: "NCCR India",
    img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=800&q=80",
    ndvi: [0.32, 0.38, 0.43, 0.49, 0.54, 0.61, 0.67, 0.72, 0.76, 0.80, 0.83, 0.86],
    documents: [
      { name: "Project Boundary GeoJSON", date: "10 Jan 2024", type: "GeoJSON" },
      { name: "Land Ownership Certificate", date: "12 Jan 2024", type: "PDF" },
      { name: "Environmental Impact Assessment", date: "20 Jan 2024", type: "PDF" },
      { name: "Baseline Assessment Report", date: "01 Feb 2024", type: "PDF" },
    ],
    timeline: [
      { label: "Project Created", detail: "Project registered on platform", date: "Jan 10, 2024", done: true },
      { label: "Documents Submitted", detail: "All boundary and ownership documents uploaded", date: "Jan 20, 2024", done: true },
      { label: "Submitted for Verification", detail: "NCCR verifier assigned and notified", date: "Feb 01, 2024", done: true },
      { label: "Field Inspection", detail: "On-site inspection by NCCR verifier team", date: "Mar 15, 2024", done: false, active: true },
      { label: "Satellite Data Validated", detail: "Sentinel-2 NDVI trend analysis confirmed", date: "Pending", done: false },
      { label: "Credits Issued", detail: "Blue carbon credits tokenized on Polygon", date: "Pending", done: false },
    ],
  },
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DB[id];

  if (!project) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Project Not Found</h2>
        <p style={{ color: "#64748b", marginBottom: 20 }}>The project you're looking for doesn't exist.</p>
        <Link to="/dashboard/projects" className="db-new-project-btn">
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>
    );
  }

  const maxNdvi = Math.max(...project.ndvi);
  const statusColor = {
    submitted: "#1d4ed8",
    pending: "#d97706",
    rejected: "#dc2626",
    active: "#22A06B",
    approved: "#22A06B",
  };

  return (
    <div>
      {/* Back nav */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 14px", background: "white",
            border: "1px solid #e8eff6", borderRadius: 10,
            fontSize: 13, fontWeight: 600, color: "#475569",
            cursor: "pointer", transition: "all .15s",
          }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>

      {/* Hero */}
      <div className="db-card" style={{ marginBottom: 20, overflow: "hidden" }}>
        <div style={{ position: "relative", height: 220 }}>
          <img
            src={project.img}
            alt={project.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(15,23,42,.75) 0%, transparent 100%)",
          }} />
          <div style={{ position: "absolute", bottom: 24, left: 28, color: "white" }}>
            <div style={{ marginBottom: 8 }}>
              <span className={`db-status ${project.status}`}>
                {project.status}
              </span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {project.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, opacity: .9 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={13} /> {project.location}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={13} /> Started {project.startDate}
              </span>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid #f1f5f9", textAlign: "center",
        }}>
          {[
            { label: "Area", value: project.area, icon: <ExternalLink size={14} color="#22A06B" /> },
            { label: "Est. Credits", value: project.estCredits, icon: <Award size={14} color="#7c3aed" /> },
            { label: "Verified Credits", value: project.verifiedCredits, icon: <ShieldCheck size={14} color="#0891b2" /> },
            { label: "Methodology", value: project.methodology.slice(0,8)+"…", icon: <FileText size={14} color="#d97706" /> },
          ].map((m) => (
            <div key={m.label} style={{ padding: "16px 12px", borderRight: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                {m.icon}
                <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em" }}>{m.label}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Description */}
          <div className="db-card">
            <div className="db-card-header"><h3>Project Overview</h3></div>
            <div className="db-card-body">
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, margin: 0 }}>{project.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
                {[
                  { label: "Ecosystem Type", value: project.ecosystem },
                  { label: "Verifier", value: project.verifier },
                  { label: "GPS Coordinates", value: project.coords },
                  { label: "Last Updated", value: project.lastUpdated },
                ].map((d) => (
                  <div key={d.label} style={{
                    padding: "12px 14px", background: "#f8fafc",
                    borderRadius: 10, border: "1px solid #f1f5f9",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{d.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NDVI Chart */}
          <div className="db-card">
            <div className="db-card-header">
              <div>
                <h3>Sentinel-2 NDVI Health Trend</h3>
                <p>Vegetation index tracked via Google Earth Engine · Last 12 months</p>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: "#22A06B",
                background: "#e9f8f1", padding: "3px 10px", borderRadius: 20,
                border: "1px solid #a7dfc5",
              }}>Live Feed</span>
            </div>
            <div className="db-card-body">
              {/* Chart bars */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 4px" }}>
                {project.ndvi.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%", justifyContent: "flex-end" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#64748b", fontFamily: "monospace" }}>
                      {val.toFixed(2)}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height: `${(val / maxNdvi) * 100}%`,
                        background: `linear-gradient(to top, #22A06B, #4ade80)`,
                        borderRadius: "4px 4px 0 0",
                        transition: "opacity .2s",
                      }}
                    />
                    <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500 }}>{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, color: "#64748b" }}>
                <span>NDVI range: <strong style={{ color: "#0f172a" }}>0.0 (Bare Soil) → 1.0 (Dense Canopy)</strong></span>
                <span style={{ color: "#22A06B", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <TrendingUp size={12} /> Target Canopy: Achieved
                </span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="db-card">
            <div className="db-card-header">
              <h3>Project Documents</h3>
              <button className="db-new-project-btn" style={{ fontSize: 12, padding: "7px 14px" }}>
                <Upload size={13} /> Upload
              </button>
            </div>
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {project.documents.map((doc) => (
                    <tr key={doc.name}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileText size={14} color="#ef4444" />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{doc.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ padding: "2px 8px", background: "#f1f5f9", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#475569" }}>
                          {doc.type}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: "#64748b" }}>{doc.date}</td>
                      <td>
                        <button className="db-view-btn">
                          <Download size={12} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Verification Timeline */}
          <div className="db-card">
            <div className="db-card-header"><h3>Verification Timeline</h3></div>
            <div className="db-card-body">
              <div className="db-timeline">
                {project.timeline.map((step, i) => (
                  <div
                    key={i}
                    className={`db-tl-item ${step.done ? "done" : step.active ? "active-step" : "pending-step"}`}
                  >
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{step.label}</h4>
                    <p style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{step.detail}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: step.done ? "#22A06B" : step.active ? "#0F4C81" : "#94a3b8",
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      {step.done
                        ? <CheckCircle size={11} />
                        : step.active
                        ? <Clock size={11} />
                        : <Clock size={11} />}
                      {step.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="db-card">
            <div className="db-card-header"><h3>Quick Actions</h3></div>
            <div className="db-card-body" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Generate Report", icon: <FileText size={14} />, color: "#7c3aed", bg: "#f3eeff", to: "/dashboard/reports" },
                { label: "View Credits", icon: <Award size={14} />, color: "#d97706", bg: "#fff8e6", to: "/dashboard/credits" },
                { label: "Upload Document", icon: <Upload size={14} />, color: "#22A06B", bg: "#e9f8f1", to: "/dashboard/documents" },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", background: action.bg,
                    borderRadius: 10, textDecoration: "none",
                    fontSize: 13, fontWeight: 600, color: action.color,
                    transition: "opacity .15s",
                  }}
                >
                  {action.icon}
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
