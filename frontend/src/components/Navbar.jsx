import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Leaf, LogOut, User, Shield, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getRoleBadgeStyle = (roleStr) => {
    switch ((roleStr || "").toUpperCase()) {
      case "GOVERNMENT":
        return "text-emerald-600 border-emerald-500/60 bg-emerald-50/50";
      case "VERIFIER":
        return "text-blue-600 border-blue-500/60 bg-blue-50/50";
      case "CORPORATE":
        return "text-amber-600 border-amber-500/60 bg-amber-50/50";
      case "NGO":
      default:
        return "text-emerald-600 border-emerald-500/60 bg-emerald-50/50";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center bg-white shadow-xs">
            <Leaf className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <span className="font-logo font-extrabold text-xl text-[#0F4C81] tracking-tight">
            KarbonShrunkhala
          </span>
        </Link>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-4 text-xs font-bold">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#0F4C81] transition px-2 py-1"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-1.5 text-slate-700 hover:text-[#0F4C81] transition px-2 py-1"
              >
                <User className="w-4 h-4 text-slate-500" />
                Profile
              </Link>

              {/* Role Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getRoleBadgeStyle(user?.role)} flex items-center gap-1 uppercase tracking-wider`}>
                <Shield className="w-3 h-3" />
                {user?.role || "NGO"}
              </span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700 transition px-2 py-1 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900 transition px-2 py-1 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-white bg-[#22A06B] hover:bg-[#1A7A52] rounded-full transition shadow-xs font-bold text-xs"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
