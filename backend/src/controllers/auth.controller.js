const authService = require("../services/auth.service");

/**
 * auth.controller.js — Auth Controller
 *
 * Handles HTTP requests for Auth API endpoints.
 * Endpoint: GET /api/auth/me
 */

class AuthController {
  async me(req, res, next) {
    try {
      const userData = await authService.getCurrentUser(req.user);
      return res.status(200).json({
        success: true,
        message: "Current user retrieved successfully",
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
