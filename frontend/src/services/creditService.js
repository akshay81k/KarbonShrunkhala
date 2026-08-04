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

export const creditService = {
  /**
   * Fetch current user's tokenized carbon credits
   */
  getMyCredits: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/credits/my-credits`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user carbon credits.");
    return data.data || [];
  },

  /**
   * Fetch all carbon credits issued across platform
   */
  getAllCredits: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/credits/all`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch platform carbon credits.");
    return data.data || [];
  },

  /**
   * Dynamic calculation breakdown based on IPCC Tier 2 / Verra VM0033 principles
   */
  calculateCredits: async (projectId) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/credits/calculate/${projectId}`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to calculate carbon credits.");
    return data.data;
  },

  /**
   * Mint ERC-1155 tokens on Polygon Amoy for an approved project
   */
  mintCredits: async (projectId, quantity, overrideReason) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/credits/mint`, {
      method: "POST",
      headers,
      body: JSON.stringify({ projectId, quantity, overrideReason }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to mint credits on Polygon Amoy.");
    return data.data;
  },
};
