const adminService = require("../services/admin.service");

class AdminController {
  async getVerifiers(req, res) {
    try {
      const verifiers = await adminService.getVerifiers();
      return res.status(200).json({
        success: true,
        count: verifiers.length,
        data: verifiers,
      });
    } catch (err) {
      console.error("Get Verifiers Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch verifiers.",
      });
    }
  }

  async createVerifier(req, res) {
    try {
      const verifier = await adminService.createVerifier(req.body);
      return res.status(201).json({
        success: true,
        message: "Verifier account created successfully.",
        data: verifier,
      });
    } catch (err) {
      console.error("Create Verifier Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to create verifier account.",
      });
    }
  }
}

module.exports = new AdminController();
