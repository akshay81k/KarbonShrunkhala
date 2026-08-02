import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";

import logo from "../../assets/images/logo.png";
import Button from "../common/Button";
import Container from "../common/Container";
import { useAuth, getRoleDashboard } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Projects", path: "/projects" },
  { name: "About Us", path: "/about" },
  { name: "Resources", path: "/resources" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const dashboardPath = getRoleDashboard(user?.role);
  const initials = (user?.fullName || user?.email || "U")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* ================= Logo ================= */}
          <Link to="/" className="flex items-center gap-3 text-decoration-none">
            <img src={logo} alt="KarbonShrunkhala" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="logo-font text-[34px] font-bold leading-none text-slate-900">
                Karbon<span className="text-[#22A06B]">Shrunkhala</span>
              </h1>
              <p className="mt-1 text-sm text-slate-500">Blue Carbon MRV System</p>
            </div>
          </Link>

          {/* ================= Desktop Navigation ================= */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative pb-1 text-[16px] font-medium transition duration-300 ${isActive
                    ? "text-[#22A06B]"
                    : "text-slate-700 hover:text-[#22A06B]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#22A06B]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ================= Desktop Actions ================= */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              /* ── Authenticated state ── */
              <>
                <Link to={dashboardPath} className="text-decoration-none">
                  <Button variant="secondary" className="rounded-xl px-5 py-2.5 flex items-center gap-2 text-sm">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>

                {/* Avatar chip */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: "linear-gradient(135deg,#22A06B,#0F4C81)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "white", flexShrink: 0,
                  }}>
                    {initials}
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-700 text-slate-900 font-bold truncate max-w-[120px]">
                      {user?.organizationName || user?.fullName || "User"}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {(user?.role || "NGO")} User
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                    title="Logout"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              </>
            ) : (
              /* ── Unauthenticated state ── */
              <>
                <Link to="/login" className="text-decoration-none">
                  <Button variant="secondary" className="rounded-xl px-6 py-3 flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="text-decoration-none">
                  <Button className="rounded-xl px-6 py-3 flex items-center gap-2">
                    <UserPlus size={18} />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ================= Mobile Toggle ================= */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-slate-700 hover:text-[#22A06B] transition"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </Container>

      {/* ================= Mobile Menu ================= */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <Container className="py-6">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium transition ${isActive
                      ? "text-[#22A06B]"
                      : "text-slate-700 hover:text-[#22A06B]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <hr className="my-2 border-slate-200" />

              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className="text-decoration-none"
                  >
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                      <LayoutDashboard size={18} />
                      My Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition text-sm"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-decoration-none">
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                      <LogIn size={18} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="text-decoration-none">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <UserPlus size={18} />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}