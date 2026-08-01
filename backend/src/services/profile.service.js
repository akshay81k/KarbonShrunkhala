const supabase = require("../config/supabase");

/**
 * profile.service.js — Profile Business Logic Service
 *
 * Purpose: Manages user profile information retrieval and updates in Supabase Auth user metadata.
 *
 * Follows API Specification Section 3:
 * - GET /api/profile
 * - PUT /api/profile (fullName, phoneNumber, organizationName)
 * - POST /api/profile/avatar
 */

class ProfileService {
  /**
   * Fetch complete profile for authenticated user
   */
  async getProfile(user) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName || "",
      role: user.role || "NGO",
      organizationName: user.organizationName || "",
      phoneNumber: user.phoneNumber || "",
      avatarUrl: user.avatarUrl || "",
    };
  }

  /**
   * Update profile fields (fullName, phoneNumber, organizationName)
   */
  async updateProfile(userId, { fullName, phoneNumber, organizationName }) {
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (organizationName !== undefined) updateData.organizationName = organizationName;

    // Update metadata in Supabase Auth
    const { data: { user }, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: updateData,
    });

    if (error) {
      console.warn("Supabase Auth admin update warning:", error.message);
    }

    return {
      id: userId,
      fullName: fullName || (user?.user_metadata?.fullName ?? ""),
      phoneNumber: phoneNumber || (user?.user_metadata?.phoneNumber ?? ""),
      organizationName: organizationName || (user?.user_metadata?.organizationName ?? ""),
    };
  }

  /**
   * Upload profile avatar URL
   */
  async updateAvatar(userId, avatarUrl) {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { avatarUrl },
    });

    if (error) {
      console.warn("Supabase avatar update warning:", error.message);
    }

    return { avatarUrl };
  }
}

module.exports = new ProfileService();
