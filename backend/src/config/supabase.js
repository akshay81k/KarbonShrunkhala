const { createClient } = require("@supabase/supabase-js");

/**
 * supabase.js — Supabase Client Configuration
 *
 * Purpose: Initializes the Supabase client for backend administrative
 * operations, authentication token verification, and user management.
 *
 * Environment Variables Used:
 * - SUPABASE_URL: Project URL from Supabase dashboard
 * - SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY: Service role key
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "⚠️ Supabase URL or Service Role Key is missing in environment variables."
  );
}

const supabase = createClient(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

module.exports = supabase;
