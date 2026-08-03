import { supabase } from "../config/supabase";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export const satelliteService = {
  /**
   * Run Sentinel-2 analysis for a project
   */
  runAnalysis: async (projectId) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/satellite/analyze/${projectId}`, {
      method: "POST",
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to run satellite analysis");
    }
    return data;
  },

  /**
   * Get historical satellite reports for a project
   */
  getProjectReports: async (projectId) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/satellite/project/${projectId}`, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch satellite reports");
    }
    return data;
  },
};
