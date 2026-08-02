import { useState } from "react";
import { FileText, Upload, Download, Search, Filter, Trash2, Eye, FolderOpen } from "lucide-react";

const DOCUMENTS = [
  { id: "D001", name: "Sundarbans Boundary GeoJSON", project: "Sundarbans Restoration", category: "Boundary", size: "142 KB", date: "10 Jan 2024", type: "GeoJSON" },
  { id: "D002", name: "Land Ownership Certificate",  project: "Sundarbans Restoration", category: "Legal",    size: "320 KB", date: "12 Jan 2024", type: "PDF" },
  { id: "D003", name: "Environmental Impact Assessment", project: "Sundarbans Restoration", category: "Assessment", size: "1.8 MB", date: "20 Jan 2024", type: "PDF" },
  { id: "D004", name: "Gahirmatha Boundary KML",    project: "Gahirmatha Mangrove",   category: "Boundary", size: "98 KB",  date: "05 Feb 2024", type: "KML" },
  { id: "D005", name: "Baseline Biomass Survey",    project: "Gahirmatha Mangrove",   category: "Assessment", size: "2.2 MB", date: "18 Feb 2024", type: "PDF" },
  { id: "D006", name: "Kadathundi Site Photographs",project: "Kadathundi Coastline",  category: "Evidence",  size: "14 MB", date: "01 Mar 2024", type: "ZIP" },
];

const CATEGORIES = ["All", "Boundary", "Legal", "Assessment", "Evidence"];

export function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [dragging, setDragging] = useState(false);

  const filtered = DOCUMENTS.filter((d) => {
    const matchCat = cat === "All" || d.category === cat;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.project.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const typeColor = { PDF: "#ef4444", GeoJSON: "#22A06B", KML: "#0F4C81", ZIP: "#d97706" };

  return (
    <div>
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Documents</h1>
          <p>Manage all project documents, GeoJSON boundaries, and evidence files</p>
        </div>
        <button className="db-new-project-btn">
          <Upload size={14} /> Upload Document
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Files", value: DOCUMENTS.length, icon: <FileText size={18} color="#0F4C81" />, bg: "#eff6ff" },
          { label: "Boundary Files", value: DOCUMENTS.filter(d=>d.category==="Boundary").length, icon: <FolderOpen size={18} color="#22A06B" />, bg: "#e9f8f1" },
          { label: "Legal Docs",   value: DOCUMENTS.filter(d=>d.category==="Legal").length, icon: <FileText size={18} color="#7c3aed" />, bg: "#f3eeff" },
          { label: "Total Size",  value: "18.5 MB", icon: <Download size={18} color="#d97706" />, bg: "#fff8e6" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-value" style={{ fontSize: 20 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Upload Drop Zone */}
      <div
        className="db-upload-area"
        style={{ marginBottom: 20, borderColor: dragging ? "#22A06B" : undefined }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
      >
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#e9f8f1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <Upload size={24} color="#22A06B" />
        </div>
        <h4>Drag & Drop files here</h4>
        <p>Supports PDF, GeoJSON, KML, KMZ, ZIP — Max 50MB per file</p>
        <button className="db-new-project-btn" style={{ margin: "14px auto 0", display: "inline-flex" }}>
          Browse Files
        </button>
      </div>

      {/* Filter + Table */}
      <div className="db-card">
        <div style={{ padding: "16px 20px", display: "flex", gap: 12, flexWrap: "wrap", borderBottom: "1px solid #f1f5f9", alignItems: "center" }}>
          <div className="db-searchbar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="db-tabs">
            {CATEGORIES.map((c) => (
              <button key={c} className={`db-tab${cat===c?" active":""}`} onClick={()=>setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Project</th>
                <th>Category</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FileText size={15} color="#ef4444" />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{d.project}</td>
                  <td>
                    <span style={{ padding: "2px 8px", background: "#f1f5f9", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#475569" }}>{d.category}</span>
                  </td>
                  <td>
                    <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "white", background: typeColor[d.type] || "#64748b" }}>{d.type}</span>
                  </td>
                  <td style={{ fontSize: 12 }}>{d.size}</td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{d.date}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="db-view-btn"><Eye size={12} /></button>
                      <button className="db-view-btn"><Download size={12} /></button>
                      <button className="db-view-btn" style={{ color: "#ef4444", borderColor: "#fee2e2" }}><Trash2 size={12} /></button>
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
