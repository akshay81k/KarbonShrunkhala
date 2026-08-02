import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, getRoleDashboard } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * AuthCallback — handles OAuth redirect after Google login.
 * Supabase automatically sets the session from the URL hash.
 * We read the role from the refreshed user object and navigate accordingly.
 */
export function AuthCallback() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(getRoleDashboard(user.role), { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-[#F8FBFC] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 text-[#22A06B] animate-spin mb-4" />
      <p className="text-sm text-slate-500 font-medium">Completing sign in...</p>
    </div>
  );
}
