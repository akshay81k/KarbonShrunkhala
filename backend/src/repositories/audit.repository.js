const prisma = require("../config/db");

/**
 * AuditRepository — Handles Notifications and AuditLogs
 * Follows 08-Folder-Structure.md & 03-Backend-Schema.md
 */
class AuditRepository {
  async createNotification(notificationData) {
    return prisma.notification.create({
      data: notificationData,
    });
  }

  async findNotificationsByUserId(userId) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markNotificationRead(id) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async logAction(logData) {
    return prisma.auditLog.create({
      data: logData,
    });
  }

  async findAllAuditLogs(limit = 100) {
    return prisma.auditLog.findMany({
      take: limit,
      include: {
        user: { select: { fullName: true, email: true, role: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}

module.exports = new AuditRepository();
