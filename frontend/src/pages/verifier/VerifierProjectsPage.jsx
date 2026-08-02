import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, MapPin, Clock } from "lucide-react";

const ALL_PROJECTS = [
  { id: "vp-1", name: "Sundarbans Restoration",   type: "Mangrove Restoration", ngo: "GreenCoast NGO",       location: "West Bengal, India", area: 1250, estCredits: 12450, submittedOn: "2h ago",  status: "pending",  img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80" },
  { id: "vp-2", name: "Gahirmatha Mangrove",       type: "Mangrove Conservation", ngo: "BluePlanet Foundation", location: "Odisha, India",       area: 850,  estCredits: 8320,  submittedOn: "1d ago",  status: "pending",  img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80" },
  { id: "vp-3", name: "Kadathundi Coastline",      type: "Seagrass Restoration", ngo: "Coastal Guardians",    location: "Tamil Nadu, India",   area: 600,  estCredits: 6210,  submittedOn: "2d ago",  status: "pending",  img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=80&q=80" },
  { id: "vp-4", name: "Andaman Blue Carbon",       type: "Mangrove Restoration", ngo: "Island Conservation",  location: "Andaman, India",      area: 920,  estCredits: 9150,  submittedOn: "3d ago",  status: "pending",  img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=80&q=80" },
  { id: "vp-5", name: "Gulf of Mannar Seagrass",   type: "Seagrass Restoration", ngo: "Marine Life Trust",    location: "Tamil Nadu, India",   area: 470,  estCredits: 4780,  submittedOn: "4d ago",  status: "pending",  img: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?w=80&q=80" },
  { id: "vp-6", name: "Mahanadi Coastline",        type: "Mangrove Conservation", ngo: "Eco Warriors India",  location: "Odisha, India",       area: 540,  estCredits: 5100,  submittedOn: "5d ago",  status: "pending",  img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&q=80" },
  { id: "vp-7", name: "Lakshadweep Marine Zone",   type: "Coral Reef",           ngo: "Ocean Guardians",      location: "Lakshadweep, India",  area: 310,  estCredits: 2850,  submittedOn: "1w ago",  status: "pending",  img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&q=80" },
  { id: "va-1", name: "Pichavaram Wetland",         type: "Salt Marsh",           ngo: "Tamil Eco Trust",      location: "Tamil Nadu, India",   area: 490,  estCredits: 4850,  submittedOn: "1mo ago", status: "accepted", img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=80&q=80" },
  { id: "va-2", name: "Gujarat Mangrove Belt",      type: "Mangrove",             ngo: "Gujarat Green",        location: "Gujarat, India",      area: 1100, estCredits: 11200, submittedOn: "2mo ago", status: "accepted", img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80" },
  { id: "vr-1", name: "Chilika Wetland",            type: "Wetland",              ngo: "Odisha Eco",           location: "Odisha, India",       area: 210,  estCredits: 2100,  submittedOn: "3mo ago", status: "rejected", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80" },
];

const TABS = [
  { key: "pending",  label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "all",      label: "All Projects" },
];

const statusStyle = {
  pending:  { background: "#dbeafe", color: "#1d4ed8" },
  accepted: { background: "#dcfce7", color: "#16a34a" },
  rejected: { background: "#fee2e2", color: "#dc2626" },
};

export function VerifierProjectsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "pending";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [search, setSearch] = useState("");

  const filtered = ALL_PROJECTS.filter((p) => {
    const matchTab = activeTab === "all" || p.status === activeTab;
    const matchSearch = !search
      || p.name.toLowerCase().includes(search.toLowerCase())
      || p.ngo.toLowerCase().includes(search.toLowerCase())
      || p.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Projects for Verification</h1>
          <p>Review, verify, and make decisions on submitted blue carbon projects</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Projects", value: ALL_PROJECTS.length, color: "#0F4C81", bg: "#eff6ff" },
          { label: "Pending",        value: ALL_PROJECTS.filter(p=>p.status==="pending").length, color: "#d97706", bg: "#fff8e6" },
          { label: "Accepted",       value: ALL_PROJECTS.filter(p=>p.status==="accepted").length, color: "#22A06B", bg: "#e9f8f1" },
          { label: "Rejected",       value: ALL_PROJECTS.filter(p=>p.status==="rejected").length, color: "#ef4444", bg: "#fee2e2" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card" style={{ borderLeft: `3px solid ${k.color}`, borderRadius: "0 20px 20px 0" }}>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-value" style={{ fontSize: 26, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="db-card" style={{ marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div className="db-searchbar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Search by project name, NGO, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="db-filter-btn"><Filter size={14} /> Filter</button>
          <div style={{ borderLeft: "1px solid #e8eff6", paddingLeft: 12 }}>
            <div className="db-tabs">
              {TABS.map((tab) => {
                const count = tab.key === "all"
                  ? ALL_PROJECTS.length
                  : ALL_PROJECTS.filter(p => p.status === tab.key).length;
                return (
                  <button
                    key={tab.key}
                    className={`db-tab${activeTab === tab.key ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                    <span className="db-tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>NGO / Organization</th>
                <th>Location</th>
                <th>Area (ha)</th>
                <th>Est. Credits (tCO₂e)</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "48px 16px", color: "#94a3b8" }}>
                    No projects found.
                  </td>
                </tr>
              ) : filtered.map((p) => (
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
                  <td style={{ fontSize: 12, fontWeight: 500 }}>{p.ngo}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={12} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: "#64748b" }}>{p.location}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{p.area.toLocaleString()}</td>
                  <td style={{ fontWeight: 700 }}>{p.estCredits.toLocaleString()}</td>
                  <td>
                    <span style={{ ...statusStyle[p.status], padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8", fontSize: 12 }}>
                      <Clock size={12} /> {p.submittedOn}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/verifier/projects/${p.id}`)}
                      style={{
                        padding: "5px 16px", background: p.status === "pending" ? "#22A06B" : "white",
                        color: p.status === "pending" ? "white" : "#22A06B",
                        border: "1px solid #22A06B", borderRadius: 8,
                        fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .15s",
                      }}
                    >
                      {p.status === "pending" ? "Review" : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="db-view-all-row">
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing {filtered.length} of {ALL_PROJECTS.length} projects
          </span>
        </div>
      </div>
    </div>
  );
}
