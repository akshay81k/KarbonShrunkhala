import { supabase } from "../config/supabase";

/**
 * authService.js — Client-Side Authentication API Client
 *
 * Handles:
 * - Email & Password Login
 * - User Signup (Restricted to NGO and CORPORATE roles)
 * - Google OAuth Sign-in
 * - Logout
 * - Current Session Retrieval
 */

export const authService = {
  /**
   * Log in with Email and Password
   */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Register a new user (Only NGO or CORPORATE allowed)
   */
  async register({ email, password, fullName, role, organizationName, phoneNumber }) {
    const allowedRoles = ["NGO", "CORPORATE"];
    const normalizedRole = (role || "").toUpperCase();

    if (!allowedRoles.includes(normalizedRole)) {
      throw new Error(
        "Self-registration is only permitted for NGO and Corporate roles. Verifier accounts must be created by Government Admin."
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          role: normalizedRole,
          organizationName,
          phoneNumber,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Log in with Google OAuth
   */
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Sign out current user
   */
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get active Supabase session
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },
};
