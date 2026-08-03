const express = require("express");
const router = express.Router();
const satelliteController = require("../controllers/satellite.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/analyze/:projectId", authenticate, (req, res) => satelliteController.runAnalysis(req, res));
router.get("/project/:projectId", authenticate, (req, res) => satelliteController.getProjectReports(req, res));

module.exports = router;
