import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Shield, Leaf, CheckCircle2, Building2, ShoppingBag } from "lucide-react";

export function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || "NGO";

  const getRoleHeader = () => {
    switch (role.toUpperCase()) {
      case "NGO":
        return {
          title: "NGO Restoration Dashboard",
          subtitle: "Register Blue Carbon projects, upload GeoJSON boundaries, and monitor mangrove health.",
          icon: <Leaf className="w-8 h-8 text-accent" />,
        };
      case "VERIFIER":
        return {
          title: "NCCR Verifier Dashboard",
          subtitle: "Review submitted Blue Carbon projects, inspect satellite NDVI reports, and issue verifications.",
          icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
        };
      case "GOVERNMENT":
        return {
          title: "Government Oversight Dashboard (MoES)",
          subtitle: "Platform-wide analytics, verifier management, national carbon credit monitoring, and audit logs.",
          icon: <Building2 className="w-8 h-8 text-warning" />,
        };
      case "CORPORATE":
        return {
          title: "Corporate Buyer Dashboard",
          subtitle: "Browse verified Blue Carbon credits, complete credit purchases, and download ESG certificates.",
          icon: <ShoppingBag className="w-8 h-8 text-secondary" />,
        };
      default:
        return {
          title: "Welcome to KarbonShrunkhala",
          subtitle: "Blockchain-Based Blue Carbon Registry and MRV System",
          icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
        };
    }
  };

  const header = getRoleHeader();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Role Banner */}
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-start gap-5">
          <div className="p-3 bg-background rounded-2xl border border-border shadow-xs">
            {header.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-heading text-2xl font-bold text-text-primary">
                {header.title}
              </h1>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                <Shield className="w-3.5 h-3.5" />
                {role}
              </span>
            </div>
            <p className="text-sm text-text-secondary">{header.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Authenticated User Status Card */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="font-heading text-lg font-bold text-text-primary mb-4">
          Session Authentication Verified
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-background rounded-xl border border-border">
            <span className="text-xs text-text-secondary uppercase font-semibold block mb-1">
              Logged In As
            </span>
            <span className="font-medium text-text-primary">{user?.fullName}</span>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border">
            <span className="text-xs text-text-secondary uppercase font-semibold block mb-1">
              Email
            </span>
            <span className="font-medium text-text-primary">{user?.email}</span>
          </div>
          <div className="p-4 bg-background rounded-xl border border-border">
            <span className="text-xs text-text-secondary uppercase font-semibold block mb-1">
              Assigned Role
            </span>
            <span className="font-medium text-accent">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
