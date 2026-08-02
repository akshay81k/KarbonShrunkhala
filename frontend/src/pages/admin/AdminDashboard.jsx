import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, UserCheck, FolderKanban, Award, ShieldAlert,
  ArrowRight, Activity, Globe, Clock, CheckCircle
} from "lucide-react";

export function AdminDashboard() {
  return (
    <div>
      {/* ── KPI Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <KPICard
          icon={<Users size={22} color="#0F4C81" />}
          iconBg="#eff6ff"
          label="Registered NGOs"
          value="12"
          accentBar="#0F4C81"
        />
        <KPICard
          icon={<UserCheck size={22} color="#22A06B" />}
          iconBg="#e9f8f1"
          label="Active Verifiers"
          value="4"
          accentBar="#22A06B"
        />
        <KPICard
          icon={<FolderKanban size={22} color="#d97706" />}
          iconBg="#fff8e6"
          label="Total Projects"
          value="35"
          sub="7 Pending Verification"
          accentBar="#d97706"
        />
        <KPICard
          icon={<Award size={22} color="#7c3aed" />}
          iconBg="#f3eeff"
          label="Total Verified Credits"
          value="12.45K"
          unit="tCO₂e"
          accentBar="#7c3aed"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        
        {/* Main Content Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Recent NGO Registrations */}
          <div className="db-card">
            <div className="db-card-header">
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Recent NGO Registrations</h3>
              <Link to="/admin/ngos" className="db-card-link">View all</Link>
            </div>
            <div className="db-table-wrap">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Region</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "GreenCoast NGO", region: "West Bengal", joined: "Oct 12, 2024", status: "Active" },
                    { name: "BluePlanet Foundation", region: "Odisha", joined: "Oct 10, 2024", status: "Active" },
                    { name: "Coastal Guardians", region: "Tamil Nadu", joined: "Oct 05, 2024", status: "Pending Review" },
                  ].map((ngo, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{ngo.name}</td>
                      <td style={{ fontSize: 12, color: "#64748b" }}>{ngo.region}</td>
                      <td style={{ fontSize: 12, color: "#64748b" }}>{ngo.joined}</td>
                      <td>
                        <span style={{ 
                          padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                          background: ngo.status === "Active" ? "#dcfce7" : "#fef3c7",
                          color: ngo.status === "Active" ? "#16a34a" : "#d97706"
                        }}>
                          {ngo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Analytics Placeholder */}
          <div className="db-card" style={{ height: 300, display: "flex", flexDirection: "column" }}>
            <div className="db-card-header">
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Platform Activity</h3>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", margin: 16, borderRadius: 12, border: "1px dashed #cbd5e1", color: "#94a3b8" }}>
              <div style={{ textAlign: "center" }}>
                <Activity size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                <div style={{ fontSize: 13, fontWeight: 600 }}>Analytics Chart Placeholder</div>
                <div style={{ fontSize: 11 }}>Project submissions vs. Verified credits over time</div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Sidebar Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          
          {/* Quick Actions */}
          <div className="db-card">
            <div className="db-card-header">
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Quick Actions</h3>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <Link to="/admin/verifiers" style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: "#f8fafc", border: "1px solid #e8eff6", borderRadius: 10, textDecoration: "none", color: "#0f172a" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e9f8f1", color: "#22A06B", display: "flex", alignItems: "center", justifyContent: "center" }}><UserCheck size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Create Verifier</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Add new certification partner</div>
                </div>
                <ArrowRight size={14} color="#94a3b8" />
              </Link>
              <Link to="/admin/projects" style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, background: "#f8fafc", border: "1px solid #e8eff6", borderRadius: 10, textDecoration: "none", color: "#0f172a" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", color: "#0F4C81", display: "flex", alignItems: "center", justifyContent: "center" }}><FolderKanban size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Assign Projects</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Map projects to verifiers</div>
                </div>
                <ArrowRight size={14} color="#94a3b8" />
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="db-card">
            <div className="db-card-header">
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>System Status</h3>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ color: "#22A06B" }}><Globe size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Polygon Registry Sync</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Synced 5 minutes ago</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22A06B" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ color: "#22A06B" }}><Activity size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Earth Engine API</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Operational</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22A06B" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function KPICard({ icon, iconBg, label, value, sub, accentBar, unit }) {
  return (
    <div className="db-kpi-card" style={{ borderLeft: `3px solid ${accentBar}`, borderRadius: "0 20px 20px 0" }}>
      <div className="db-kpi-icon" style={{ background: iconBg }}>{icon}</div>
      <div className="db-kpi-label">{label}</div>
      <div className="db-kpi-value">
        {value}
        {unit && <small style={{ fontSize: 11, fontWeight: 600, color: "#64748b", marginLeft: 4 }}>{unit}</small>}
      </div>
      {sub && <div className="db-kpi-sub">{sub}</div>}
    </div>
  );
}
