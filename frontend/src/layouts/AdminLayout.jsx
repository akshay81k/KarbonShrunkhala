import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, Users, UserCheck, FolderKanban,
  Award, FileSpreadsheet, BarChart3, Bell, Settings,
  LogOut, Menu, X, ChevronDown, ShieldAlert, ShoppingBag
} from "lucide-react";
import logo from "../assets/images/logo.png";

const NAV = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, end: true },
      { name: "NGOs", path: "/admin/ngos", icon: Users },
      { name: "Verifiers", path: "/admin/verifiers", icon: UserCheck },
      { name: "Projects", path: "/admin/projects", icon: FolderKanban },
      { name: "Credits", path: "/admin/credits", icon: Award },
    ],
  },
  {
    label: "Platform",
    items: [
      { name: "Marketplace", path: "/admin/marketplace", icon: ShoppingBag },
      { name: "Reports", path: "/admin/reports", icon: FileSpreadsheet },
      { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Notifications", path: "/admin/notifications", icon: Bell },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount] = useState(2);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (user?.fullName || user?.email || "AD")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FBFC", fontFamily: "'Inter',sans-serif" }}>

      {/* ── Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,.45)",
            zIndex: 40, backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{
        position: "fixed", top: 0, left: 0,
        width: 240, height: "100vh",
        background: "#fff",
        borderRight: "1px solid #E8EFF6",
        display: "flex", flexDirection: "column",
        zIndex: 50,
        boxShadow: "2px 0 20px rgba(15,76,129,.06)",
        transform: sidebarOpen ? "translateX(0)" : undefined,
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#e2e8f0 transparent",
      }}>

        {/* Logo */}
        <Link to="/" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "18px 18px 14px",
          borderBottom: "1px solid #E8EFF6",
          textDecoration: "none", flexShrink: 0,
        }}>
          <img src={logo} alt="KarbonShrunkhala" style={{ width: 34, height: 34, objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 }}>
              Karbon<span style={{ color: "#22A06B" }}>Shrunkhala</span>
            </div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Govt Admin Portal</div>
          </div>
        </Link>

        {/* Nav sections */}
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {NAV.map((section) => (
            <div key={section.label}>
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#94a3b8", padding: "14px 12px 6px" }}>
                {section.label}
              </p>
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  style={({ isActive }) => ({
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 12px", borderRadius: 10, marginBottom: 2,
                    textDecoration: "none", fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#22A06B" : "#475569",
                    background: isActive ? "#E9F8F1" : "transparent",
                    transition: "all .18s",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={16} style={{ flexShrink: 0, color: isActive ? "#22A06B" : "#94a3b8" }} />
                      {item.name}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}

          {/* Logout */}
          <div style={{ marginTop: 4 }}>
            <button
              onClick={handleLogout}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10, width: "100%",
                border: "none", background: "transparent",
                color: "#ef4444", fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all .18s",
              }}
            >
              <LogOut size={16} style={{ color: "#ef4444" }} />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* ══════════ MAIN AREA ══════════ */}
      <div style={{ marginLeft: 240, flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

        {/* ── Top Navbar ── */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(255,255,255,.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E8EFF6",
          height: 64, display: "flex", alignItems: "center",
          padding: "0 24px", gap: 16,
          boxShadow: "0 1px 8px rgba(15,76,129,.06)",
        }}>
          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: "none", padding: 8, border: "none",
              background: "transparent", borderRadius: 8, cursor: "pointer", color: "#475569",
            }}
            className="admin-mobile-toggle"
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "#fee2e2", color: "#ef4444", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              <ShieldAlert size={14} /> SYSTEM ADMIN
            </div>
          </div>

          {/* Notification bell */}
          <button
            onClick={() => navigate("/admin/notifications")}
            style={{
              position: "relative", width: 38, height: 38,
              border: "1px solid #E8EFF6", borderRadius: 10,
              background: "white", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#475569",
            }}
          >
            <Bell size={16} />
            {notifCount > 0 && (
              <span style={{
                position: "absolute", top: -5, right: -5,
                background: "#ef4444", color: "white",
                fontSize: 9, fontWeight: 700, width: 17, height: 17,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid white",
              }}>{notifCount}</span>
            )}
          </button>

          {/* User chip */}
          <Link to="/admin/settings" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 10px 5px 5px", background: "white",
            border: "1px solid #E8EFF6", borderRadius: 10, textDecoration: "none",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg,#ef4444,#0F4C81)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "white",
            }}>
              {initials}
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                {user?.fullName || "Admin User"}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Government</div>
            </div>
            <ChevronDown size={13} style={{ color: "#94a3b8", marginLeft: 2 }} />
          </Link>
        </header>

        {/* ── Page Content ── */}
        <main style={{ padding: 24, flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
