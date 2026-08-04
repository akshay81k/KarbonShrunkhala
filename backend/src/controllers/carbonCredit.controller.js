const carbonCreditService = require("../services/carbonCredit.service");

class CarbonCreditController {
  async mintCredits(req, res) {
    try {
      const { projectId, amount } = req.body;
      if (!projectId) {
        return res.status(400).json({ success: false, message: "projectId is required." });
      }

      const result = await carbonCreditService.mintProjectCredits(projectId, req.user, amount);
      return res.status(200).json({
        success: true,
        message: "Successfully minted ERC-1155 Blue Carbon tokens on Polygon Amoy Testnet!",
        data: result,
      });
    } catch (err) {
      console.error("Mint Credits Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to mint carbon credits on Polygon Amoy.",
      });
    }
  }

  async getUserCredits(req, res) {
    try {
      const credits = await carbonCreditService.getUserCredits(req.user.id);
      return res.status(200).json({
        success: true,
        count: credits.length,
        data: credits,
      });
    } catch (err) {
      console.error("Get User Credits Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch user carbon credits.",
      });
    }
  }

  async getAllCredits(req, res) {
    try {
      const credits = await carbonCreditService.getAllCredits();
      return res.status(200).json({
        success: true,
        count: credits.length,
        data: credits,
      });
    } catch (err) {
      console.error("Get All Credits Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch carbon credits.",
      });
    }
  }
}

module.exports = new CarbonCreditController();
