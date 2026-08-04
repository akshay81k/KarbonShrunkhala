const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const authenticate = require("../middleware/auth.middleware");

router.use(authenticate);

router.get("/", (req, res) => notificationController.getNotifications(req, res));
router.put("/read-all", (req, res) => notificationController.markAllRead(req, res));
router.put("/:id/read", (req, res) => notificationController.markRead(req, res));
router.delete("/:id", (req, res) => notificationController.deleteNotification(req, res));

module.exports = router;
