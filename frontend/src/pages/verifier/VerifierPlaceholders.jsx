import { Shield, FileText, Award, FolderOpen, Settings, Users, Building } from "lucide-react";

function VerifierPlaceholder({ title, description, icon: Icon }) {
  return (
    <div style={{
      minHeight: "50vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center",
      background: "white", borderRadius: 20, boxShadow: "0 1px 3px rgba(15,23,42,0.05)",
      border: "1px solid #e8eff6"
    }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "#e9f8f1", display: "flex", alignItems: "center", justifyContent: "center", color: "#22A06B", marginBottom: 20 }}>
        <Icon size={32} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
      <p style={{ fontSize: 14, color: "#64748b", maxWidth: 400, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

export function VerifierProfilePage() {
  return <VerifierPlaceholder title="Verifier Profile" description="Manage your accreditation details, certification numbers, and personal information." icon={Shield} />;
}

export function VerifierReportsPage() {
  return <VerifierPlaceholder title="Verification Reports" description="Access all generated MRV verification reports, audit logs, and satellite analysis summaries." icon={FileText} />;
}

export function VerifierCreditsPage() {
  return <VerifierPlaceholder title="Credit Issuance Logs" description="Track the history of credits verified and issued to the blockchain through your approval." icon={Award} />;
}

export function VerifierDocumentsPage() {
  return <VerifierPlaceholder title="Document Vault" description="Central repository of all NGO submitted documents, methodologies, and evidence files." icon={FolderOpen} />;
}

export function VerifierSettingsPage() {
  return <VerifierPlaceholder title="System Settings" description="Configure notification preferences, 2FA security, and API access keys." icon={Settings} />;
}

export function VerifierOrganizationsPage() {
  return <VerifierPlaceholder title="Registered Organizations" description="Directory of all NGOs, corporate buyers, and partners registered on the platform." icon={Building} />;
}

export function VerifierUsersPage() {
  return <VerifierPlaceholder title="User Management" description="View system users, roles, and activity logs across the platform." icon={Users} />;
}
