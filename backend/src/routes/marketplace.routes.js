const express = require("express");
const router = express.Router();
const marketplaceController = require("../controllers/marketplace.controller");
const authenticate = require("../middleware/auth.middleware");

// Public / Authenticated route to browse active credit listings
router.get("/listings", (req, res) => marketplaceController.getAllListings(req, res));
router.get("/listings/:id", (req, res) => marketplaceController.getListingById(req, res));
router.get("/certificates/download/:filename", (req, res) => marketplaceController.downloadCertificate(req, res));

// Authenticated Routes
router.post("/listings", authenticate, (req, res) => marketplaceController.createListing(req, res));
router.post("/purchase", authenticate, (req, res) => marketplaceController.purchaseCredits(req, res));
router.get("/my-certificates", authenticate, (req, res) => marketplaceController.getBuyerCertificates(req, res));

module.exports = router;
