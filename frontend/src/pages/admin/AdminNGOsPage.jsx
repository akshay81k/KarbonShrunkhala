import { Search, Filter, Mail, MapPin, MoreVertical, ShieldCheck, ShieldAlert } from "lucide-react";
import Button from "../../components/common/Button";

const NGOS = [
  { id: "n1", name: "GreenCoast NGO", email: "arvind@greencoast.in", location: "West Bengal, India", joined: "Oct 12, 2024", projects: 3, status: "Active" },
  { id: "n2", name: "BluePlanet Foundation", email: "contact@blueplanet.org", location: "Odisha, India", joined: "Oct 10, 2024", projects: 1, status: "Active" },
  { id: "n3", name: "Coastal Guardians", email: "hello@coastalguardians.in", location: "Tamil Nadu, India", joined: "Oct 05, 2024", projects: 0, status: "Pending Review" },
  { id: "n4", name: "Island Conservation", email: "admin@islandcon.org", location: "Andaman, India", joined: "Sep 22, 2024", projects: 1, status: "Active" },
  { id: "n5", name: "Eco Warriors India", email: "info@ecowarriors.in", location: "Odisha, India", joined: "Sep 15, 2024", projects: 2, status: "Suspended" },
];

export function AdminNGOsPage() {
  return (
    <div>
      {/* Header */}
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Registered NGOs</h1>
          <p>Review and manage Non-Governmental Organizations on the platform</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <div className="db-kpi-card" style={{ borderLeft: "3px solid #0F4C81", borderRadius: "0 20px 20px 0" }}>
          <div className="db-kpi-label">Total NGOs</div>
          <div className="db-kpi-value" style={{ color: "#0F4C81" }}>12</div>
        </div>
        <div className="db-kpi-card" style={{ borderLeft: "3px solid #22A06B", borderRadius: "0 20px 20px 0" }}>
          <div className="db-kpi-label">Active / Approved</div>
          <div className="db-kpi-value" style={{ color: "#22A06B" }}>9</div>
        </div>
        <div className="db-kpi-card" style={{ borderLeft: "3px solid #d97706", borderRadius: "0 20px 20px 0" }}>
          <div className="db-kpi-label">Pending Review</div>
          <div className="db-kpi-value" style={{ color: "#d97706" }}>3</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="db-card" style={{ marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div className="db-searchbar" style={{ flex: 1, minWidth: 200 }}>
            <Search size={14} />
            <input type="text" placeholder="Search NGOs by name, email or location..." />
          </div>
          <button className="db-filter-btn"><Filter size={14} /> Status: All</button>
        </div>
      </div>

      {/* Table */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Organization / Contact</th>
                <th>Location</th>
                <th>Projects</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {NGOS.map((n) => (
                <tr key={n.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eff6ff", color: "#0F4C81", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                        {n.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{n.name}</div>
                        <div style={{ fontSize: 11, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><Mail size={10} /> {n.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <MapPin size={14} color="#94a3b8" />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>{n.location}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{n.projects}</td>
                  <td style={{ fontSize: 12, color: "#64748b" }}>{n.joined}</td>
                  <td>
                    <span style={{ 
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: n.status === "Active" ? "#dcfce7" : n.status === "Pending Review" ? "#fef3c7" : "#fee2e2",
                      color: n.status === "Active" ? "#16a34a" : n.status === "Pending Review" ? "#d97706" : "#dc2626"
                    }}>
                      {n.status}
                    </span>
                  </td>
                  <td>
                    {n.status === "Pending Review" ? (
                      <button style={{ padding: "5px 12px", background: "#22A06B", color: "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <ShieldCheck size={12} /> Approve
                      </button>
                    ) : n.status === "Active" ? (
                      <button style={{ padding: "5px 12px", background: "white", color: "#ef4444", border: "1px solid #fca5a5", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <ShieldAlert size={12} /> Suspend
                      </button>
                    ) : (
                      <button style={{ padding: "5px 12px", background: "white", color: "#22A06B", border: "1px solid #86efac", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <ShieldCheck size={12} /> Reactivate
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
