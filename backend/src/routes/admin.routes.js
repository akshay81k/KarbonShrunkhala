const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.use(authenticate);
router.use(authorizeRoles("GOVERNMENT"));

router.get("/verifiers", (req, res) => adminController.getVerifiers(req, res));
router.post("/verifiers", (req, res) => adminController.createVerifier(req, res));

module.exports = router;
