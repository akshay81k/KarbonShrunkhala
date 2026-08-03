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

export const verificationService = {
  /**
   * Get all projects pending verification
   */
  getPendingProjects: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/verifications/pending`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch pending projects.");
    return data.data || [];
  },

  /**
   * Get Verifier Dashboard Statistics
   */
  getDashboardStats: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/verifications/stats`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch verifier stats.");
    return data.data || {};
  },

  /**
   * Submit official verification decision (APPROVED, REJECTED, NEEDS_REVISION)
   */
  submitDecision: async (projectId, { decision, remarks }) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/verifications/${projectId}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ decision, remarks }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to record decision.");
    return data.data;
  },

  /**
   * Get verification decision history for a project
   */
  getProjectVerifications: async (projectId) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/verifications/project/${projectId}`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch verifications.");
    return data.data || [];
  },
};
