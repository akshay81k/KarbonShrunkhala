import { useState } from "react";
import { Bell, CheckCircle, AlertCircle, Info, TrendingUp, Trash2, Check } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, type: "success", title: "Credits Verified",          body: "2,460 tCO₂e credits have been verified by NCCR for the Sundarbans Restoration project.",    time: "2 hours ago",  read: false },
  { id: 2, type: "info",    title: "Verifier Assigned",         body: "A field verifier from NCCR has been assigned to inspect the Gahirmatha Mangrove project.",   time: "1 day ago",    read: false },
  { id: 3, type: "warning", title: "Document Review Pending",   body: "Your Land Ownership Certificate for Kadathundi Coastline is pending review.",               time: "2 days ago",   read: false },
  { id: 4, type: "success", title: "Project Submitted",         body: "Kadathundi Coastline Seagrass Restoration has been successfully submitted for verification.", time: "3 days ago",   read: true },
  { id: 5, type: "info",    title: "Report Generated",          body: "Your Q2 Impact Summary report has been generated and is ready to download.",                 time: "5 days ago",   read: true },
  { id: 6, type: "error",   title: "Document Rejected",         body: "The GeoJSON boundary for Chilika Wetland was rejected due to incomplete boundary coverage.", time: "1 week ago",   read: true },
  { id: 7, type: "success", title: "Platform Update",           body: "KarbonShrunkhala v2.1 is live! New satellite analytics features are now available.",        time: "2 weeks ago",  read: true },
];

const typeConfig = {
  success: { icon: <CheckCircle size={16} />, color: "#22A06B", bg: "#e9f8f1", dot: "#22A06B" },
  info:    { icon: <Info size={16} />,        color: "#0F4C81", bg: "#eff6ff", dot: "#0F4C81" },
  warning: { icon: <AlertCircle size={16} />, color: "#d97706", bg: "#fff8e6", dot: "#d97706" },
  error:   { icon: <AlertCircle size={16} />, color: "#ef4444", bg: "#fee2e2", dot: "#ef4444" },
};

export function NotificationsPage() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const filtered = items.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read")   return n.read;
    return true;
  });

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id) => setItems((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div>
      <div className="db-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>Notifications</h1>
          <p>Stay updated on your projects, credits, and platform activity</p>
        </div>
        {unreadCount > 0 && (
          <button
            className="db-filter-btn"
            onClick={markAllRead}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Check size={14} /> Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total",   value: items.length, icon: <Bell size={18} color="#0F4C81" />, bg: "#eff6ff" },
          { label: "Unread",  value: unreadCount,  icon: <AlertCircle size={18} color="#d97706" />, bg: "#fff8e6" },
          { label: "Read",    value: items.length - unreadCount, icon: <CheckCircle size={18} color="#22A06B" />, bg: "#e9f8f1" },
        ].map((k) => (
          <div key={k.label} className="db-kpi-card">
            <div className="db-kpi-icon" style={{ background: k.bg }}>{k.icon}</div>
            <div className="db-kpi-label">{k.label}</div>
            <div className="db-kpi-value" style={{ fontSize: 22 }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ marginBottom: 16 }}>
        <div className="db-tabs">
          {["all","unread","read"].map((t) => (
            <button key={t} className={`db-tab${filter===t?" active":""}`} onClick={()=>setFilter(t)} style={{ textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      <div className="db-card">
        <div style={{ padding: "8px 20px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 24px", color: "#94a3b8" }}>
              <Bell size={40} style={{ marginBottom: 12, opacity: .5 }} />
              <p>No notifications found</p>
            </div>
          ) : filtered.map((n) => {
            const cfg = typeConfig[n.type];
            return (
              <div
                key={n.id}
                className="db-notif-item"
                style={{ background: n.read ? "transparent" : "#fafcff", borderRadius: 10, padding: "14px 12px", marginBottom: 2 }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#0f172a" }}>{n.title}</h4>
                    {!n.read && (
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0F4C81", flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>{n.body}</p>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>{n.time}</span>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="db-view-btn"
                      style={{ padding: "5px 8px" }}
                      title="Mark as read"
                    >
                      <Check size={12} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(n.id)}
                    className="db-view-btn"
                    style={{ padding: "5px 8px", color: "#ef4444", borderColor: "#fee2e2" }}
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
