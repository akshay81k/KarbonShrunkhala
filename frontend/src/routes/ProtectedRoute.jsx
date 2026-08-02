import { Navigate, useLocation } from "react-router-dom";
import { useAuth, getRoleDashboard } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * ProtectedRoute Component
 *
 * Checks if the user is authenticated.
 * Optionally checks if the user's role is in allowedRoles.
 *
 * - If not authenticated → redirect to /login (preserving intended destination)
 * - If role unauthorized → redirect to the user's OWN dashboard (role-aware)
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FBFC] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#22A06B] animate-spin mb-3" />
        <p className="text-sm text-slate-500 font-medium">Verifying authentication...</p>
      </div>
    );
  }

  // Not authenticated → send to login, remember where they wanted to go
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check — redirect to the user's own dashboard if role doesn't match
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user?.role || "").toUpperCase();
    const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

    if (!normalizedAllowed.includes(userRole)) {
      // Send to the correct dashboard for their actual role
      return <Navigate to={getRoleDashboard(userRole)} replace />;
    }
  }

  return children;
}
