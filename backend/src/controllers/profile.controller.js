const profileService = require("../services/profile.service");

/**
 * profile.controller.js — Profile Controller
 *
 * Handles HTTP requests for Profile API endpoints:
 * - GET /api/profile
 * - PUT /api/profile
 * - POST /api/profile/avatar
 */

class ProfileController {
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfile(req.user);
      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { fullName, phoneNumber, organizationName } = req.body;
      const updated = await profileService.updateProfile(req.user.id, {
        fullName,
        phoneNumber,
        organizationName,
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const avatarUrl = req.body.avatarUrl || req.file?.path || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250";
      const updated = await profileService.updateAvatar(req.user.id, avatarUrl);

      return res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully",
        data: updated,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProfileController();
