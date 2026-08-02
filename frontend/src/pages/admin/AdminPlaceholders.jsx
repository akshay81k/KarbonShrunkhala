import { FileSpreadsheet, BarChart3, Settings, Bell, Award } from "lucide-react";

function AdminPlaceholder({ title, description, icon: Icon }) {
  return (
    <div style={{
      minHeight: "50vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center",
      background: "white", borderRadius: 20, boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
      border: "1px solid #e8eff6"
    }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", marginBottom: 20 }}>
        <Icon size={32} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
      <p style={{ fontSize: 14, color: "#64748b", maxWidth: 400, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

export function AdminCreditsPage() {
  return <AdminPlaceholder title="Verified Credits" description="Platform-wide ledger of all carbon credits verified, issued, and listed on the marketplace." icon={Award} />;
}

export function AdminReportsPage() {
  return <AdminPlaceholder title="Platform Reports" description="Generate system-wide compliance, MRV, and registration reports for regulatory bodies." icon={FileSpreadsheet} />;
}

export function AdminAnalyticsPage() {
  return <AdminPlaceholder title="Global Analytics" description="High-level charts and data covering total sequestration, NGO activity, and marketplace volume." icon={BarChart3} />;
}

export function AdminSettingsPage() {
  return <AdminPlaceholder title="Platform Settings" description="Configure global platform variables, methodology parameters, and API integration settings." icon={Settings} />;
}

export function AdminNotificationsPage() {
  return <AdminPlaceholder title="System Notifications" description="Critical alerts regarding verifier SLA breaches, rejected projects, or system anomalies." icon={Bell} />;
}
