const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");

/**
 * auth.routes.js — Authentication Routes
 *
 * GET /api/auth/me — Return currently logged in user
 */

router.get("/me", authenticate, (req, res, next) => authController.me(req, res, next));

module.exports = router;
