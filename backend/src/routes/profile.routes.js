const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const authenticate = require("../middleware/auth.middleware");

/**
 * profile.routes.js — User Profile Routes
 *
 * GET /api/profile — Fetch current user profile
 * PUT /api/profile — Update current user profile
 * POST /api/profile/avatar — Upload user avatar
 */

router.get("/", authenticate, (req, res, next) => profileController.getProfile(req, res, next));
router.put("/", authenticate, (req, res, next) => profileController.updateProfile(req, res, next));
router.post("/avatar", authenticate, (req, res, next) => profileController.uploadAvatar(req, res, next));

module.exports = router;
