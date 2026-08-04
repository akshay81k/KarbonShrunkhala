const notificationService = require("../services/notification.service");

class NotificationController {
  async getNotifications(req, res) {
    try {
      const notifications = await notificationService.getUserNotifications(req.user);
      return res.status(200).json({
        success: true,
        count: notifications.length,
        data: notifications,
      });
    } catch (err) {
      console.error("Get Notifications Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch notifications.",
      });
    }
  }

  async markRead(req, res) {
    try {
      await notificationService.markRead(req.params.id, req.user);
      return res.status(200).json({
        success: true,
        message: "Notification marked as read.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  async markAllRead(req, res) {
    try {
      await notificationService.markAllRead(req.user);
      return res.status(200).json({
        success: true,
        message: "All notifications marked as read.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  async deleteNotification(req, res) {
    try {
      await notificationService.deleteNotification(req.params.id, req.user);
      return res.status(200).json({
        success: true,
        message: "Notification deleted.",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new NotificationController();
