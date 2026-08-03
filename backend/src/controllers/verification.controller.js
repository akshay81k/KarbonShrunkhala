const verificationService = require("../services/verification.service");

class VerificationController {
  async getPendingProjects(req, res) {
    try {
      const projects = await verificationService.getPendingProjects();
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (err) {
      console.error("Get Pending Projects Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch pending projects.",
      });
    }
  }

  async submitDecision(req, res) {
    try {
      const result = await verificationService.submitDecision(
        req.user,
        req.params.projectId,
        req.body
      );
      return res.status(200).json({
        success: true,
        message: `Project verification decision '${req.body.decision}' recorded.`,
        data: result,
      });
    } catch (err) {
      console.error("Submit Decision Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to record verification decision.",
      });
    }
  }

  async getProjectVerifications(req, res) {
    try {
      const verifications = await verificationService.getProjectVerifications(req.params.projectId);
      return res.status(200).json({
        success: true,
        data: verifications,
      });
    } catch (err) {
      console.error("Get Project Verifications Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch project verifications.",
      });
    }
  }

  async getDashboardStats(req, res) {
    try {
      const stats = await verificationService.getVerifierDashboardStats(req.user.id);
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (err) {
      console.error("Get Verifier Stats Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch verifier stats.",
      });
    }
  }
}

module.exports = new VerificationController();
