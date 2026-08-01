const supabase = require("../config/supabase");

/**
 * auth.service.js — Auth Business Logic Service
 *
 * Purpose: Handles user authentication, token retrieval, and user profile metadata lookup.
 */

class AuthService {
  /**
   * Get authenticated user profile details from request user object or Supabase
   */
  async getCurrentUser(user) {
    if (!user) {
      throw new Error("No authenticated user session found");
    }

    return {
      id: user.id,
      name: user.fullName || user.email.split("@")[0],
      email: user.email,
      role: user.role || "NGO",
      organizationName: user.organizationName || "",
      phoneNumber: user.phoneNumber || "",
    };
  }
}

module.exports = new AuthService();
