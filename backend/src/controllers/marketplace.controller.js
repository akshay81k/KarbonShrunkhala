const marketplaceService = require("../services/marketplace.service");
const path = require("path");
const fs = require("fs");

class MarketplaceController {
  async getAllListings(req, res) {
    try {
      const listings = await marketplaceService.getAllListings(req.query);
      return res.status(200).json({
        success: true,
        count: listings.length,
        data: listings,
      });
    } catch (err) {
      console.error("Get All Listings Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch marketplace listings.",
      });
    }
  }

  async getListingById(req, res) {
    try {
      const listing = await marketplaceService.getListingById(req.params.id);
      return res.status(200).json({
        success: true,
        data: listing,
      });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: err.message || "Listing not found.",
      });
    }
  }

  async createListing(req, res) {
    try {
      const listing = await marketplaceService.createListing(req.user, req.body);
      return res.status(201).json({
        success: true,
        message: "Carbon credits successfully listed on marketplace!",
        data: listing,
      });
    } catch (err) {
      console.error("Create Listing Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to create marketplace listing.",
      });
    }
  }

  async purchaseCredits(req, res) {
    try {
      const result = await marketplaceService.purchaseCredits(req.user, req.body);
      return res.status(200).json({
        success: true,
        message: "Credit purchase completed! Official PDF ESG Certificate issued.",
        data: result,
      });
    } catch (err) {
      console.error("Purchase Credits Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Trade execution failed.",
      });
    }
  }

  async getBuyerCertificates(req, res) {
    try {
      const certificates = await marketplaceService.getBuyerCertificates(req.user.id);
      return res.status(200).json({
        success: true,
        count: certificates.length,
        data: certificates,
      });
    } catch (err) {
      console.error("Get Buyer Certificates Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch ESG certificates.",
      });
    }
  }

  async downloadCertificate(req, res) {
    try {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, "../../uploads/certificates", filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: "ESG Certificate file not found." });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      return res.sendFile(filePath);
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new MarketplaceController();
