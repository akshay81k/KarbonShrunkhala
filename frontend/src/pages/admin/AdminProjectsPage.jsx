import { Search, Filter, MapPin, Clock, ShieldCheck } from "lucide-react";
import Button from "../../components/common/Button";

const PROJECTS = [
  { id: "p1", name: "Sundarbans Restoration", ngo: "GreenCoast NGO", verifier: "SustainCert Global", location: "West Bengal, India", status: "Under Verification", credits: 12450 },
  { id: "p2", name: "Gahirmatha Mangrove", ngo: "BluePlanet Foundation", verifier: "EcoAudit India", location: "Odisha, India", status: "Under Verification", credits: 8320 },
  { id: "p3", name: "Kadathundi Coastline", ngo: "Coastal Guardians", verifier: "Pending Assignment", location: "Tamil Nadu, India", status: "Submitted", credits: 6210 },
  { id: "p4", name: "Pichavaram Wetland", ngo: "Tamil Eco Trust", verifier: "SustainCert Global", location: "Tamil Nadu, India", status: "Approved", credits: 4850 },
];

export function AdminProjectsPage() {
  return (
    <div>
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Global Project Registry</h1>
          <p>Monitor all carbon projects across the platform and oversee verifier assignments</p>
        </div>
      </div>

      <div className="db-card" style={{ marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div className="db-searchbar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={14} />
            <input type="text" placeholder="Search projects by name, NGO, or Location..." />
          </div>
          <button className="db-filter-btn"><Filter size={14} /> Status: All</button>
        </div>
      </div>

      <div className="db-card">
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>NGO</th>
                <th>Assigned Verifier</th>
                <th>Location</th>
                <th>Est. Credits</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700, color: "#0f172a" }}>{p.name}</td>
                  <td style={{ fontSize: 13, color: "#475569" }}>{p.ngo}</td>
                  <td>
                    {p.verifier === "Pending Assignment" ? (
                      <span style={{ fontSize: 12, color: "#d97706", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        Unassigned
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: "#0F4C81", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        <ShieldCheck size={12} /> {p.verifier}
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={12} color="#94a3b8" />
                      <span style={{ fontSize: 12, color: "#64748b" }}>{p.location}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 13, color: "#7c3aed" }}>{p.credits.toLocaleString()}</td>
                  <td>
                    <span style={{ 
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: p.status === "Approved" ? "#dcfce7" : p.status === "Under Verification" ? "#dbeafe" : "#fef3c7",
                      color: p.status === "Approved" ? "#16a34a" : p.status === "Under Verification" ? "#1d4ed8" : "#d97706"
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    {p.verifier === "Pending Assignment" ? (
                      <button style={{ padding: "5px 12px", background: "#0F4C81", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        Assign Verifier
                      </button>
                    ) : (
                      <button style={{ padding: "5px 12px", background: "white", color: "#475569", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        View Details
                      </button>
                    )}
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
