import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, User, FolderKanban, Award, FileSpreadsheet,
  FileText, Bell, Settings, HelpCircle, LogOut, Menu, X,
  PlusCircle, ChevronDown, Calendar, Leaf, ArrowRight, ShoppingBag
} from "lucide-react";
import logo from "../assets/images/logo.png";

const NAV = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
      { name: "Profile", path: "/dashboard/profile", icon: User },
      { name: "Projects", path: "/dashboard/projects", icon: FolderKanban },
      { name: "Marketplace", path: "/dashboard/marketplace", icon: ShoppingBag },
      { name: "Credits", path: "/dashboard/credits", icon: Award },
      { name: "Reports", path: "/dashboard/reports", icon: FileSpreadsheet },
    ],
  },
  {
    label: "Support",
    items: [
      { name: "Documents", path: "/dashboard/documents", icon: FileText },
      { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
      { name: "Help Center", path: "/dashboard/help", icon: HelpCircle },
    ],
  },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount] = useState(3);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (user?.user_metadata?.full_name || user?.email || "NGO")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FBFC", fontFamily: "'Inter',sans-serif" }}>

      {/* ── Mobile Overlay ── */}
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
      <aside
        className="dashboard-sidebar"
        style={{
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
        }}
      >
        {/* Logo Header */}
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
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Blue Carbon MRV System</div>
          </div>
        </Link>

        {/* Navigation Section */}
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

          {/* Logout Button */}
          <div style={{ marginTop: 8 }}>
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

        {/* Impact Promo Card */}
        <div style={{
          margin: "10px 10px 14px",
          background: "linear-gradient(135deg,#064e3b,#0f172a)",
          borderRadius: 14, padding: 14, color: "#fff", flexShrink: 0,
        }}>
          <div style={{ width: 32, height: 32, background: "rgba(34,160,107,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyCenter: "center", marginBottom: 8, color: "#34d399" }}>
            <Leaf size={16} />
          </div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>Make an Impact</h4>
          <p style={{ fontSize: 10.5, color: "#cbd5e1", margin: "0 0 10px", lineHeight: 1.3 }}>Track, verify and grow blue carbon projects</p>
          <Link
            to="/dashboard/projects"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              width: "100%", padding: "7px 0", background: "#22A06B", color: "#fff",
              borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: "none",
            }}
          >
            View Projects <ArrowRight size={12} />
          </Link>
        </div>

      </aside>

      {/* ══════════ MAIN CONTENT CONTAINER ══════════ */}
      <div
        className="dashboard-main-content"
        style={{
          marginLeft: 240,
          width: "calc(100% - 240px)",
          flex: 1, minWidth: 0,
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E8EFF6",
          padding: "12px 28px",
          display: "flex", alignItems: "center", justifyContent: "between",
          gap: 16,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-sidebar-toggle"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "NGO Partner"}! 👋
            </h2>
            <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0", fontWeight: 500 }}>
              Here's an overview of your projects, credits, and impact.
            </p>
          </div>

          <div style={{ display: "flex", itemsCenter: "center", gap: 12 }}>
            <div style={{ display: "flex", itemsCenter: "center", gap: 6, padding: "6px 12px", background: "#f1f5f9", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#475569" }}>
              <Calendar size={14} style={{ color: "#94a3b8" }} />
              <span>Last 6 Months</span>
              <ChevronDown size={14} style={{ color: "#94a3b8" }} />
            </div>

            <Link
              to="/dashboard/notifications"
              style={{
                position: "relative", width: 36, height: 36,
                border: "1px solid #E8EFF6", borderRadius: 10,
                background: "white", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#475569", textDecoration: "none",
              }}
            >
              <Bell size={16} />
              {notifCount > 0 && (
                <span style={{
                  position: "absolute", top: -3, right: -3,
                  background: "#22A06B", color: "white",
                  fontSize: 9, fontWeight: 700, width: 16, height: 16,
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid white",
                }}>{notifCount}</span>
              )}
            </Link>

            <Link
              to="/dashboard/profile"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 10px 4px 6px", background: "white",
                border: "1px solid #E8EFF6", borderRadius: 12,
                textDecoration: "none", color: "inherit",
              }}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#22A06B", color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {initials}
              </div>
              <div style={{ textTransform: "none" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 }}>
                  {user?.user_metadata?.full_name || "NGO User"}
                </div>
                <div style={{ fontSize: 10, color: "#64748b" }}>NGO User</div>
              </div>
              <ChevronDown size={14} style={{ color: "#94a3b8" }} />
            </Link>

            <Link
              to="/dashboard/projects"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", background: "#22A06B", color: "white",
                borderRadius: 10, fontSize: 12, fontWeight: 700,
                textDecoration: "none", boxShadow: "0 2px 8px rgba(34,160,107,0.25)",
              }}
            >
              <PlusCircle size={15} />
              <span>New Project</span>
            </Link>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main style={{ flex: 1, padding: "24px 28px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer style={{
          padding: "14px 28px", background: "#fff",
          borderTop: "1px solid #E8EFF6", fontSize: 11, color: "#94a3b8",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>© 2025 KarbonShrunkhala. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "#94a3b8", textDecoration: "none" }}>Help Center</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
