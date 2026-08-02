import { useState } from "react";
import {
  User, Building, Mail, Phone, Shield, Bell, Lock, Key,
  Save, CheckCircle2, AlertCircle, Eye, EyeOff, Camera,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("account");
  const [saved, setSaved] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [notifs, setNotifs] = useState({
    emailProjects:   true,
    emailCredits:    true,
    emailReports:    false,
    emailMarketing:  false,
    pushAll:         true,
  });

  const [twoFA, setTwoFA] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ value, onChange }) => (
    <label className="db-toggle">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      <span className="db-toggle-slider" />
    </label>
  );

  const SECTIONS = [
    { key: "account",       label: "Account Details",  icon: <User size={15} /> },
    { key: "notifications", label: "Notifications",    icon: <Bell size={15} /> },
    { key: "security",      label: "Security",         icon: <Lock size={15} /> },
    { key: "api",           label: "API Keys",         icon: <Key size={15} /> },
  ];

  return (
    <div>
      <div className="db-page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences, notifications, and security</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>

        {/* Sidebar */}
        <div className="db-card" style={{ padding: "12px 10px", alignSelf: "start" }}>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                width: "100%", padding: "10px 12px", border: "none",
                borderRadius: 10, textAlign: "left", cursor: "pointer",
                fontSize: 13, fontWeight: activeSection === s.key ? 700 : 500,
                background: activeSection === s.key ? "#e9f8f1" : "transparent",
                color: activeSection === s.key ? "#22A06B" : "#475569",
                transition: "all .15s", marginBottom: 2,
              }}
            >
              <span style={{ color: activeSection === s.key ? "#22A06B" : "#94a3b8" }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="db-card">
          <div className="db-card-body">
            {saved && (
              <div style={{ padding: "12px 16px", background: "#e9f8f1", border: "1px solid #a7dfc5", borderRadius: 10, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={16} color="#22A06B" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0a4a2e" }}>Settings saved successfully!</span>
              </div>
            )}

            {/* ── Account Section ── */}
            {activeSection === "account" && (
              <div>
                <div className="db-settings-section">
                  <h3>Profile Information</h3>

                  {/* Avatar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#22A06B,#0F4C81)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "white" }}>
                        {(user?.fullName || "G").charAt(0).toUpperCase()}
                      </div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: "#0F4C81", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <Camera size={12} color="white" />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{user?.fullName || "GreenCoast NGO"}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{user?.email}</div>
                    </div>
                  </div>

                  {[
                    { label: "Full Name", placeholder: user?.fullName || "Full Name", icon: <User size={16} color="#94a3b8" />, type: "text" },
                    { label: "Organization", placeholder: user?.organizationName || "Organization Name", icon: <Building size={16} color="#94a3b8" />, type: "text" },
                    { label: "Email Address", placeholder: user?.email || "email@example.com", icon: <Mail size={16} color="#94a3b8" />, type: "email" },
                    { label: "Phone Number", placeholder: user?.phoneNumber || "+91 98765 43210", icon: <Phone size={16} color="#94a3b8" />, type: "tel" },
                  ].map((field) => (
                    <div key={field.label} style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
                        {field.label}
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fafc", border: "1px solid #e8eff6", borderRadius: 10 }}>
                        {field.icon}
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#0f172a", flex: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Notifications Section ── */}
            {activeSection === "notifications" && (
              <div>
                <div className="db-settings-section">
                  <h3>Email Notifications</h3>
                  {[
                    { key: "emailProjects", label: "Project Updates", desc: "Receive emails about project status changes and verifier actions" },
                    { key: "emailCredits",  label: "Credit Alerts",   desc: "Get notified when credits are generated, verified, or transferred" },
                    { key: "emailReports",  label: "Report Ready",    desc: "Email notification when a new satellite report is generated" },
                    { key: "emailMarketing",label: "Platform News",   desc: "Receive updates about new platform features and announcements" },
                  ].map((row) => (
                    <div key={row.key} className="db-settings-row">
                      <div>
                        <div className="db-settings-label">{row.label}</div>
                        <div className="db-settings-desc">{row.desc}</div>
                      </div>
                      <Toggle value={notifs[row.key]} onChange={(v) => setNotifs((p) => ({ ...p, [row.key]: v }))} />
                    </div>
                  ))}
                </div>
                <div className="db-settings-section">
                  <h3>Push Notifications</h3>
                  <div className="db-settings-row">
                    <div>
                      <div className="db-settings-label">Enable Push Notifications</div>
                      <div className="db-settings-desc">Receive real-time browser push notifications</div>
                    </div>
                    <Toggle value={notifs.pushAll} onChange={(v) => setNotifs((p) => ({ ...p, pushAll: v }))} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Security Section ── */}
            {activeSection === "security" && (
              <div>
                <div className="db-settings-section">
                  <h3>Change Password</h3>
                  {[
                    { label: "Current Password", show: showOldPass, toggle: () => setShowOldPass(!showOldPass) },
                    { label: "New Password",      show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                    { label: "Confirm Password",  show: showNewPass, toggle: () => setShowNewPass(!showNewPass) },
                  ].map((field) => (
                    <div key={field.label} style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
                        {field.label}
                      </label>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fafc", border: "1px solid #e8eff6", borderRadius: 10 }}>
                        <Lock size={16} color="#94a3b8" />
                        <input
                          type={field.show ? "text" : "password"}
                          placeholder="••••••••"
                          style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#0f172a", flex: 1 }}
                        />
                        <button type="button" onClick={field.toggle} style={{ border: "none", background: "none", cursor: "pointer", color: "#94a3b8" }}>
                          {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="db-settings-section">
                  <h3>Two-Factor Authentication</h3>
                  <div className="db-settings-row">
                    <div>
                      <div className="db-settings-label">Enable 2FA</div>
                      <div className="db-settings-desc">Add an extra layer of security to your account using an authenticator app</div>
                    </div>
                    <Toggle value={twoFA} onChange={setTwoFA} />
                  </div>
                  {twoFA && (
                    <div style={{ padding: "14px 16px", background: "#e9f8f1", border: "1px solid #a7dfc5", borderRadius: 10, fontSize: 12, color: "#0a4a2e", marginTop: 12 }}>
                      <strong>2FA Enabled!</strong> Scan the QR code in your authenticator app (Google Authenticator or Authy) to complete setup.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── API Keys Section ── */}
            {activeSection === "api" && (
              <div>
                <div className="db-settings-section">
                  <h3>API Access Keys</h3>
                  <div style={{ padding: "16px", background: "#fff8e6", border: "1px solid #fed7aa", borderRadius: 10, marginBottom: 20, display: "flex", gap: 10 }}>
                    <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.5 }}>
                      Your API keys are secret — do not share them publicly. Regenerate immediately if compromised.
                    </p>
                  </div>
                  {[
                    { label: "Platform API Key",   value: "ks_live_8X4kPm2rN9vQzLy7jHcBdT1wAe5sUo3f" },
                    { label: "Satellite Data Key", value: "gee_k_7Y2nV6pQa1bDhRcW9mKsXtJzFo4eNgMl" },
                  ].map((k) => (
                    <div key={k.label} style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>
                        {k.label}
                      </label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#f8fafc", border: "1px solid #e8eff6", borderRadius: 10, flex: 1 }}>
                          <Key size={15} color="#94a3b8" />
                          <input
                            type="password"
                            value={k.value}
                            readOnly
                            style={{ border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "monospace", color: "#0f172a", flex: 1 }}
                          />
                        </div>
                        <button className="db-filter-btn">Copy</button>
                        <button className="db-filter-btn" style={{ color: "#ef4444", borderColor: "#fee2e2" }}>Revoke</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px", background: "#0F4C81",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                transition: "background .18s", marginTop: 8,
              }}
            >
              <Save size={15} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
