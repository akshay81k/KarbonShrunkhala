import axios from "axios";
import { supabase } from "../config/supabase";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Helper to get authorization headers with current Supabase access token
 */
async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
}

export const profileService = {
  /**
   * Fetch current user profile from Express backend
   */
  async getProfile() {
    const config = await getAuthHeaders();
    const response = await axios.get(`${API_BASE}/profile`, config);
    return response.data;
  },

  /**
   * Update profile information
   */
  async updateProfile(profileData) {
    const config = await getAuthHeaders();
    const response = await axios.put(`${API_BASE}/profile`, profileData, config);
    return response.data;
  },

  /**
   * Upload profile avatar URL
   */
  async uploadAvatar(avatarUrl) {
    const config = await getAuthHeaders();
    const response = await axios.post(`${API_BASE}/profile/avatar`, { avatarUrl }, config);
    return response.data;
  },
};
