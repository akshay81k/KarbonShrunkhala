import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

/**
 * Maps a user role to their home dashboard path.
 * Used by Login, Register, ProtectedRoute, and Navbar.
 */
export function getRoleDashboard(role) {
  switch ((role || "").toUpperCase()) {
    case "VERIFIER":
      return "/verifier/dashboard";
    case "GOVERNMENT":
      return "/admin/dashboard";
    case "CORPORATE":
      return "/dashboard"; // Corporate buyer uses NGO dashboard for now
    default:
      return "/dashboard"; // NGO default
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(formatUser(session.user));
      }
      setLoading(false);
    });

    // 2. Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser(formatUser(session.user));
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function formatUser(supabaseUser) {
    const meta = supabaseUser.user_metadata || {};
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      fullName: meta.fullName || meta.full_name || supabaseUser.email.split("@")[0],
      role: meta.role || "NGO",
      organizationName: meta.organizationName || meta.organization_name || "",
      phoneNumber: meta.phoneNumber || meta.phone_number || "",
      avatarUrl: meta.avatarUrl || "",
    };
  }

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data?.user) {
      setUser(formatUser(data.user));
    }
    return data;
  };

  const register = async (formData) => {
    const data = await authService.register(formData);
    if (data?.user) {
      setUser(formatUser(data.user));
    }
    return data;
  };

  const loginWithGoogle = async () => {
    return await authService.loginWithGoogle();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    role: user?.role || null,
    login,
    register,
    loginWithGoogle,
    logout,
    isAuthenticated: !!session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
