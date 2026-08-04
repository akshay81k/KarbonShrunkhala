import { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertCircle, Info, Trash2, Check, Loader2 } from "lucide-react";
import { supabase } from "../../config/supabase";

const typeConfig = {
  success: { icon: <CheckCircle size={16} />, color: "#22A06B", bg: "#e9f8f1" },
  info: { icon: <Info size={16} />, color: "#0F4C81", bg: "#eff6ff" },
  warning: { icon: <AlertCircle size={16} />, color: "#d97706", bg: "#fff8e6" },
  error: { icon: <AlertCircle size={16} />, color: "#ef4444", bg: "#fee2e2" },
};

export function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch("http://localhost:5000/api/notifications", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch("http://localhost:5000/api/notifications/read-all", {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
    } catch (err) {}
  };

  const markRead = async (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
    } catch (err) {}
  };

  const deleteNotif = async (id) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await fetch(`http://localhost:5000/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
    } catch (err) {}
  };

  const filtered = items.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const unreadCount = items.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">Notifications</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Real-time updates on your registered projects, verification decisions, and credit issuance</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Check size={14} /> Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-blue-600">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Notifications</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{items.length}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-amber-600">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Unread Alerts</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{unreadCount}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 border-l-4 border-l-emerald-600">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Archived / Read</span>
          <span className="font-heading text-2xl font-extrabold text-slate-900 block">{items.length - unreadCount}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600 w-fit">
        {["all", "unread", "read"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1 rounded-lg capitalize transition cursor-pointer ${
              filter === t ? "bg-white text-emerald-700 shadow-2xs font-extrabold" : "hover:text-slate-900"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4">
          {loading ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
              <span className="text-xs font-medium">Loading notifications...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="font-bold text-slate-600">No notifications found.</p>
              <p className="text-[11px] text-slate-400">Activity updates on project registration and verification will appear here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((n) => {
                const cfg = typeConfig[n.type] || typeConfig.info;
                return (
                  <div
                    key={n.id}
                    className={`p-4 rounded-xl border transition flex items-start gap-3.5 ${
                      n.isRead ? "bg-white border-slate-100" : "bg-slate-50/80 border-slate-200 shadow-2xs"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.icon}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-xs font-bold text-slate-900">{n.title}</h4>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{n.message || n.body}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {new Date(n.createdAt || Date.now()).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!n.isRead && (
                        <button
                          onClick={() => markRead(n.id)}
                          className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition cursor-pointer"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotif(n.id)}
                        className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-400 transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
