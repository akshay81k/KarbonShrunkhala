const express = require("express");
const router = express.Router();
const verificationController = require("../controllers/verification.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.get("/pending", authenticate, authorizeRoles("VERIFIER", "GOVERNMENT"), (req, res) => verificationController.getPendingProjects(req, res));
router.get("/stats", authenticate, authorizeRoles("VERIFIER", "GOVERNMENT"), (req, res) => verificationController.getDashboardStats(req, res));
router.post("/:projectId", authenticate, authorizeRoles("VERIFIER", "GOVERNMENT"), (req, res) => verificationController.submitDecision(req, res));
router.get("/project/:projectId", authenticate, (req, res) => verificationController.getProjectVerifications(req, res));

module.exports = router;
