import { supabase } from "../config/supabase";

/**
 * projectService.js — Client-Side Project API Service
 * Communicates with backend Express REST API at /api/projects
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
}

export const projectService = {
  /**
   * Fetch all projects accessible to current user
   */
  async getAllProjects(params = {}) {
    const headers = await getAuthHeaders();
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/projects${query ? `?${query}` : ""}`;

    const res = await fetch(url, { headers });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to fetch projects.");
    return json.data || [];
  },

  async getProjects(params = {}) {
    return this.getAllProjects(params);
  },

  /**
   * Fetch project by ID
   */
  async getProjectById(id) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, { headers });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Project not found.");
    return json.data;
  },

  /**
   * Create a new project (FormData for files)
   */
  async createProject(formData) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        ...headers,
        // Content-Type omitted so browser sets boundary for multipart/form-data
      },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to create project.");
    return json.data;
  },

  /**
   * Update project details or status
   */
  async updateProject(id, updateData) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update project.");
    return json.data;
  },

  /**
   * Delete draft project
   */
  async deleteProject(id) {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to delete project.");
    return json;
  },
};
