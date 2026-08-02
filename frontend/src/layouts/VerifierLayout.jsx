import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, FolderKanban, Satellite, FileText,
  FileSpreadsheet, Award, Bell, Settings, LogOut,
  Menu, X, ChevronDown, Calendar, Users, Building,
  ArrowRight, ShieldCheck, ChevronRight,
} from "lucide-react";
import logo from "../assets/images/logo.png";

const NAV = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", path: "/verifier/dashboard", icon: LayoutDashboard, end: true },
      {
        name: "Projects", icon: FolderKanban,
        children: [
          { name: "Pending Verification", path: "/verifier/projects?tab=pending", base: "/verifier/projects" },
          { name: "Accepted Projects", path: "/verifier/projects?tab=accepted", base: "/verifier/projects" },
          { name: "Rejected Projects", path: "/verifier/projects?tab=rejected", base: "/verifier/projects" },
          { name: "All Projects", path: "/verifier/projects", base: "/verifier/projects" },
        ],
      },
      { name: "Satellite Verification", path: "/verifier/satellite", icon: Satellite },
      { name: "Documents", path: "/verifier/documents", icon: FileText },
      { name: "Reports", path: "/verifier/reports", icon: FileSpreadsheet },
      { name: "Credits", path: "/verifier/credits", icon: Award },
      { name: "Organizations", path: "/verifier/organizations", icon: Building },
      { name: "Users", path: "/verifier/users", icon: Users },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Notifications", path: "/verifier/notifications", icon: Bell },
      { name: "Settings", path: "/verifier/settings", icon: Settings },
    ],
  },
];

export function VerifierLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [notifCount] = useState(4);

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (user?.fullName || user?.email || "VS")
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
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Blue Carbon MRV System</div>
          </div>
        </Link>

        {/* Nav sections */}
        <nav style={{ flex: 1, padding: "10px 10px" }}>
          {NAV.map((section) => (
            <div key={section.label}>
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#94a3b8", padding: "14px 12px 6px" }}>
                {section.label}
              </p>
              {section.items.map((item) => {
                if (item.children) {
                  const isParentActive = location.pathname.startsWith("/verifier/projects");
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setProjectsOpen(!projectsOpen)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "9px 12px", borderRadius: 10, width: "100%",
                          border: "none", background: isParentActive ? "#E9F8F1" : "transparent",
                          color: isParentActive ? "#22A06B" : "#475569",
                          fontSize: 13, fontWeight: isParentActive ? 700 : 500,
                          cursor: "pointer", textAlign: "left", transition: "all .18s",
                          marginBottom: 2,
                        }}
                      >
                        <item.icon size={16} style={{ flexShrink: 0, color: isParentActive ? "#22A06B" : "#94a3b8" }} />
                        <span style={{ flex: 1 }}>{item.name}</span>
                        {projectsOpen
                          ? <ChevronDown size={14} />
                          : <ChevronRight size={14} />}
                      </button>
                      {projectsOpen && (
                        <div style={{ paddingLeft: 28, marginBottom: 4 }}>
                          {item.children.map((child) => {
                            const isActive = child.path === "/verifier/projects"
                              ? location.pathname === "/verifier/projects" && !location.search
                              : location.pathname === "/verifier/projects" && location.search.includes(child.path.split("?tab=")[1]);
                            return (
                              <Link
                                key={child.name}
                                to={child.path}
                                style={{
                                  display: "flex", alignItems: "center", gap: 8,
                                  padding: "7px 10px", borderRadius: 8, marginBottom: 1,
                                  textDecoration: "none", fontSize: 12,
                                  fontWeight: isActive ? 700 : 500,
                                  color: isActive ? "#22A06B" : "#64748b",
                                  background: isActive ? "#f0fdf4" : "transparent",
                                  transition: "all .15s",
                                }}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
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
                );
              })}
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

        {/* Help Promo */}
        <div style={{
          margin: "10px 10px 14px",
          background: "linear-gradient(135deg,#e9f8f1,#d1f0e2)",
          border: "1px solid #a7dfc5", borderRadius: 14, padding: 14, flexShrink: 0,
        }}>
          <div style={{ width: 34, height: 34, background: "#22A06B", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <ShieldCheck size={16} color="white" />
          </div>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#0a4a2e", margin: "0 0 4px" }}>Need Help?</h4>
          <p style={{ fontSize: 11, color: "#276b47", margin: "0 0 10px", lineHeight: 1.4 }}>Contact support for assistance</p>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", padding: "7px 10px", background: "#22A06B", color: "white",
            border: "none", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer",
          }}>
            Contact Support <ArrowRight size={12} />
          </button>
        </div>
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
            className="verifier-mobile-toggle"
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
              Welcome back, Verifier! 👋
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              Review and verify blue carbon projects submitted by NGOs.
            </div>
          </div>

          {/* Date filter */}
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 13px", background: "white", border: "1px solid #E8EFF6",
            borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#475569", cursor: "pointer",
          }}>
            <Calendar size={13} /> Last 6 Months <ChevronDown size={13} />
          </button>

          {/* Notification bell */}
          <button
            onClick={() => navigate("/verifier/notifications")}
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
          <Link to="/verifier/profile" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 10px 5px 5px", background: "white",
            border: "1px solid #E8EFF6", borderRadius: 10, textDecoration: "none",
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: "linear-gradient(135deg,#22A06B,#0F4C81)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "white",
            }}>
              {initials}
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                {user?.organizationName || user?.fullName || "Verifier"}
              </div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Corporate Verifier</div>
            </div>
            <ChevronDown size={13} style={{ color: "#94a3b8", marginLeft: 2 }} />
          </Link>
        </header>

        {/* ── Page Content ── */}
        <main style={{ padding: 24, flex: 1 }}>
          <Outlet />
        </main>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: "1px solid #E8EFF6", padding: "16px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 11, color: "#94a3b8",
        }}>
          <span>© 2025 KarbonShrunkhala. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/privacy" style={{ color: "#94a3b8", textDecoration: "none" }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: "#94a3b8", textDecoration: "none" }}>Terms of Service</Link>
            <Link to="/verifier/help" style={{ color: "#94a3b8", textDecoration: "none" }}>Help Center</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
