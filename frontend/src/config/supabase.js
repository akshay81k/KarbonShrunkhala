import { createClient } from "@supabase/supabase-js";

/**
 * supabase.js — Client-Side Supabase Initialization
 *
 * Purpose: Initializes the Supabase client for browser-based authentication
 * (Email/Password login, Google OAuth, session persistence).
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase URL or Anon/Publishable Key is missing in frontend environment."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
