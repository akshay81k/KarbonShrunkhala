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

export const marketplaceService = {
  /**
   * Fetch active carbon credit marketplace listings
   */
  getAllListings: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/marketplace/listings${query ? `?${query}` : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch marketplace listings.");
    return data.data || [];
  },

  /**
   * Fetch details of a single listing
   */
  getListingById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/marketplace/listings/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Listing not found.");
    return data.data;
  },

  /**
   * List carbon credits for sale (NGO / Credit holder)
   */
  createListing: async ({ creditId, pricePerCredit, quantity }) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/marketplace/listings`, {
      method: "POST",
      headers,
      body: JSON.stringify({ creditId, pricePerCredit, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to list credits on marketplace.");
    return data.data;
  },

  /**
   * Execute credit purchase trade (Corporate Buyer)
   */
  purchaseCredits: async ({ listingId, quantity }) => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/marketplace/purchase`, {
      method: "POST",
      headers,
      body: JSON.stringify({ listingId, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Trade purchase failed.");
    return data.data;
  },

  /**
   * Fetch Corporate Buyer ESG certificates & trade history
   */
  getBuyerCertificates: async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/marketplace/my-certificates`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch ESG certificates.");
    return data.data || [];
  },
};
