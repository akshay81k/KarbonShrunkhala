import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  LineChart,
  FileText,
  FileSpreadsheet,
  Award,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  ShoppingBag,
  Users,
  History,
  FileCheck,
} from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role || "NGO";

  const getNavItems = () => {
    switch (role.toUpperCase()) {
      case "NGO":
        return [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "My Projects", path: "/dashboard/projects", icon: FolderKanban },
          { name: "Monitoring", path: "/dashboard/monitoring", icon: LineChart },
          { name: "Documents", path: "/dashboard/documents", icon: FileText },
          { name: "Reports", path: "/dashboard/reports", icon: FileSpreadsheet },
          { name: "Credits", path: "/dashboard/credits", icon: Award },
          { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
          { name: "Support", path: "/dashboard/support", icon: HelpCircle },
        ];
      case "VERIFIER":
        return [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "Pending Verification", path: "/dashboard/pending", icon: ShieldCheck },
          { name: "Satellite Reports", path: "/dashboard/satellite", icon: LineChart },
          { name: "History Logs", path: "/dashboard/history", icon: History },
        ];
      case "GOVERNMENT":
        return [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "Project Oversight", path: "/dashboard/all-projects", icon: FolderKanban },
          { name: "User Management", path: "/dashboard/users", icon: Users },
          { name: "Platform Analytics", path: "/dashboard/analytics", icon: LineChart },
          { name: "Audit Logs", path: "/dashboard/audit", icon: FileText },
        ];
      case "CORPORATE":
        return [
          { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
          { name: "Credit Marketplace", path: "/dashboard/marketplace", icon: ShoppingBag },
          { name: "Purchased Credits", path: "/dashboard/my-credits", icon: Award },
          { name: "ESG Certificates", path: "/dashboard/certificates", icon: FileCheck },
        ];
      default:
        return [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-[#0A111F] text-slate-300 min-h-[calc(100vh-4rem)] border-r border-slate-800 flex flex-col justify-between p-3 shrink-0 hidden md:flex">
      <div className="space-y-4">
        
        {/* Logged in Role Banner */}
        <div className="px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
              LOGGED IN ROLE
            </span>
            <span className="text-xs font-extrabold text-white block tracking-wide">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#0E2A22] text-emerald-400 font-bold border-l-4 border-emerald-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2.5 border-t border-slate-800 text-[10px] text-slate-500 space-y-0.5">
        <p className="font-bold text-slate-400">KarbonShrunkhala MRV</p>
        <p>Sentinel-2 &amp; Polygon Connected</p>
      </div>
    </aside>
  );
}
