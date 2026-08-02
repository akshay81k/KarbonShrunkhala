import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  PlusCircle, Search, Filter, Eye, MapPin, Clock, ArrowRight,
} from "lucide-react";

const ALL_PROJECTS = [
  { id: "proj-1", name: "Sundarbans Restoration", type: "Mangrove Restoration", location: "West Bengal, India", area: "1,250 ha", estCredits: "12,450 tCO₂e", status: "submitted", lastUpdated: "2h ago", img: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=80&q=80" },
  { id: "proj-2", name: "Gahirmatha Mangrove", type: "Mangrove Conservation", location: "Odisha, India", area: "850 ha", estCredits: "8,320 tCO₂e", status: "submitted", lastUpdated: "1d ago", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=80&q=80" },
  { id: "proj-3", name: "Kadathundi Coastline", type: "Seagrass Restoration", location: "Tamil Nadu, India", area: "600 ha", estCredits: "6,210 tCO₂e", status: "submitted", lastUpdated: "3d ago", img: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=80&q=80" },
  { id: "proj-4", name: "Mahanadi Mangroves", type: "Mangrove Restoration", location: "Odisha, India", area: "720 ha", estCredits: "7,900 tCO₂e", status: "pending", lastUpdated: "5d ago", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&q=80" },
  { id: "proj-5", name: "Pichavaram Wetland", type: "Salt Marsh Conservation", location: "Tamil Nadu, India", area: "490 ha", estCredits: "4,850 tCO₂e", status: "pending", lastUpdated: "1w ago", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=80&q=80" },
  { id: "proj-6", name: "Gulf of Kutch Seagrass", type: "Seagrass Meadow", location: "Gujarat, India", area: "380 ha", estCredits: "3,210 tCO₂e", status: "pending", lastUpdated: "2w ago", img: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?w=80&q=80" },
  { id: "proj-7", name: "Chilika Wetland Project", type: "Wetland Restoration", location: "Odisha, India", area: "210 ha", estCredits: "2,100 tCO₂e", status: "rejected", lastUpdated: "3w ago", img: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=80&q=80" },
  { id: "proj-8", name: "Andaman Coral Reef", type: "Coral Reef Protection", location: "Andaman & Nicobar", area: "150 ha", estCredits: "1,540 tCO₂e", status: "rejected", lastUpdated: "1mo ago", img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=80&q=80" },
];

const TABS = [
  { key: "all",       label: "All Projects" },
  { key: "submitted", label: "Submitted" },
  { key: "pending",   label: "Pending" },
  { key: "rejected",  label: "Rejected" },
];

export function ProjectsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_PROJECTS.filter((p) => {
    const matchTab = activeTab === "all" || p.status === activeTab;
    const matchSearch = !search
      || p.name.toLowerCase().includes(search.toLowerCase())
      || p.location.toLowerCase().includes(search.toLowerCase())
      || p.type.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="db-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1>My Projects Portfolio</h1>
          <p>Manage your registered Blue Carbon restoration sites</p>
        </div>
        <button
          className="db-new-project-btn"
          onClick={() => navigate("/dashboard/projects")}
          style={{ marginTop: 4, flexShrink: 0 }}
        >
          <PlusCircle size={14} /> New Project
        </button>
      </div>

      {/* Filters bar */}
      <div className="db-card" style={{ marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div className="db-searchbar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="Search by name, location, ecosystem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="db-filter-btn">
            <Filter size={14} /> Filter
          </button>
        </div>
        <div style={{ padding: "0 16px 14px", borderTop: "1px solid #f1f5f9" }}>
          <div className="db-tabs" style={{ marginTop: 12 }}>
            {TABS.map((tab) => {
              const count = tab.key === "all"
                ? ALL_PROJECTS.length
                : ALL_PROJECTS.filter((p) => p.status === tab.key).length;
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

      {/* Projects Table */}
      <div className="db-card">
        <div className="db-table-wrap">
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 16px", color: "#94a3b8" }}>
                    No projects found matching your criteria.
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
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={12} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: "#64748b" }}>{p.location}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, fontSize: 13 }}>{p.area}</span></td>
                  <td><span style={{ fontWeight: 600, fontSize: 13 }}>{p.estCredits}</span></td>
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
                      <Eye size={12} /> View Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="db-view-all-row">
            <span style={{ fontSize: 12, color: "#64748b" }}>
              Showing {filtered.length} of {ALL_PROJECTS.length} projects
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
