import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard, User, FolderKanban, Award, FileSpreadsheet,
  FileText, Bell, Settings, HelpCircle, LogOut, Menu, X,
  PlusCircle, ChevronDown, Calendar, Leaf, ArrowRight,
} from "lucide-react";
import logo from "../assets/images/logo.png";

const MAIN_NAV = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, end: true },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "Projects", path: "/dashboard/projects", icon: FolderKanban },
  { name: "Credits", path: "/dashboard/credits", icon: Award },
  { name: "Reports", path: "/dashboard/reports", icon: FileSpreadsheet },
];

const SUPPORT_NAV = [
  { name: "Documents", path: "/dashboard/documents", icon: FileText },
  { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
  { name: "Help Center", path: "/dashboard/help", icon: HelpCircle },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount] = useState(3);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = (user?.fullName || user?.email || "U")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `db-nav-item${isActive ? " active" : ""}`
      }
    >
      <item.icon className="db-nav-icon" />
      {item.name}
    </NavLink>
  );

  return (
    <div className="db-shell">

      {/* ── Sidebar Overlay (mobile) ── */}
      <div
        className={`db-sidebar-overlay${sidebarOpen ? " show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ══════════ LEFT SIDEBAR ══════════ */}
      <aside className={`db-sidebar${sidebarOpen ? " open" : ""}`}>

        {/* Logo */}
        <Link to="/" className="db-sidebar-logo">
          <img src={logo} alt="KarbonShrunkhala" />
          <div>
            <h2>Karbon<span>Shrunkhala</span></h2>
            <p>Blue Carbon MRV System</p>
          </div>
        </Link>

        {/* MAIN section */}
        <nav className="db-sidebar-nav">
          <p className="db-sidebar-section-label">Main</p>
          {MAIN_NAV.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}

          <p className="db-sidebar-section-label">Support</p>
          {SUPPORT_NAV.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}

          <p className="db-sidebar-section-label">Account</p>
          <button className="db-nav-item logout-item" onClick={handleLogout}>
            <LogOut className="db-nav-icon" />
            Logout
          </button>
        </nav>

        {/* Promo card */}
        <div className="db-sidebar-promo">
          <div className="db-sidebar-promo-icon">
            <Leaf size={18} color="white" />
          </div>
          <h4>Make an Impact</h4>
          <p>Track, verify and grow blue carbon projects</p>
          <button className="db-sidebar-promo-btn">
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </aside>

      {/* ══════════ MAIN AREA ══════════ */}
      <div className="db-main">

        {/* ── Top Navbar ── */}
        <header className="db-topbar">
          <div className="db-topbar-left">
            {/* Mobile menu toggle */}
            <button
              className="db-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Greeting */}
            <div className="db-topbar-greeting">
              <h2>Welcome back, {user?.organizationName || user?.fullName || "GreenCoast NGO"}! 👋</h2>
              <p>Here's an overview of your projects, credits, and impact.</p>
            </div>
          </div>

          <div className="db-topbar-right">
            {/* Date filter */}
            <button className="db-date-filter">
              <Calendar size={13} />
              <span>Last 6 Months</span>
              <ChevronDown size={13} />
            </button>

            {/* Notifications */}
            <button
              className="db-notif-btn"
              onClick={() => navigate("/dashboard/notifications")}
              aria-label="Notifications"
            >
              <Bell size={16} />
              {notifCount > 0 && (
                <span className="db-notif-badge">{notifCount}</span>
              )}
            </button>

            {/* User dropdown */}
            <Link to="/dashboard/profile" className="db-user-btn">
              <div className="db-user-avatar">
                {user?.avatarUrl
                  ? <img src={user.avatarUrl} alt={initials} />
                  : initials}
              </div>
              <div className="db-user-info">
                <strong>{user?.organizationName || user?.fullName || "GreenCoast NGO"}</strong>
                <span>NGO User</span>
              </div>
              <ChevronDown size={13} style={{ color: "#94a3b8", marginLeft: 2 }} />
            </Link>

            {/* New Project */}
            <Link to="/dashboard/projects" className="db-new-project-btn">
              <PlusCircle size={14} />
              <span>New Project</span>
            </Link>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="db-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
