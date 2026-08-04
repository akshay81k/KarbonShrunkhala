const express = require("express");
const router = express.Router();
const carbonCreditController = require("../controllers/carbonCredit.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

router.get("/my-credits", authenticate, (req, res) => carbonCreditController.getUserCredits(req, res));
router.get("/all", authenticate, authorizeRoles("GOVERNMENT", "VERIFIER"), (req, res) => carbonCreditController.getAllCredits(req, res));

// On-Chain Token Minting allowed for both VERIFIER and GOVERNMENT (Admin)
router.post("/mint", authenticate, authorizeRoles("GOVERNMENT", "VERIFIER"), (req, res) => carbonCreditController.mintCredits(req, res));

module.exports = router;
