const prisma = require("../config/db");

class NotificationService {
  /**
   * Fetch all real notifications for the logged-in user
   */
  async getUserNotifications(user) {
    const dbNotifs = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    // Dynamically generate user-specific activity notifications if DB is empty
    if (dbNotifs.length === 0) {
      const generatedNotifs = [];

      if (user.role === "NGO") {
        // Fetch NGO's user projects to generate real activity entries
        const projects = await prisma.project.findMany({
          where: { ownerId: user.id },
          include: {
            verifications: { orderBy: { verifiedAt: "desc" }, take: 1 },
            carbonCredits: true,
          },
          orderBy: { createdAt: "desc" },
        });

        for (const p of projects) {
          generatedNotifs.push({
            id: `notif-created-${p.id}`,
            userId: user.id,
            title: `Project Registered: ${p.projectName}`,
            message: `Your Blue Carbon restoration site in ${p.district}, ${p.state} (${p.areaHectares} Ha) has been registered in the database.`,
            isRead: true,
            type: "info",
            createdAt: p.createdAt,
          });

          if (p.verifications && p.verifications.length > 0) {
            const v = p.verifications[0];
            generatedNotifs.push({
              id: `notif-verif-${v.id}`,
              userId: user.id,
              title: `Verification Decision: ${p.projectName}`,
              message: `Official decision by verifier: ${v.decision}. Remarks: ${v.remarks || "No remarks provided."}`,
              isRead: false,
              type: v.decision === "APPROVED" ? "success" : "warning",
              createdAt: v.verifiedAt,
            });
          }

          if (p.carbonCredits && p.carbonCredits.length > 0) {
            for (const c of p.carbonCredits) {
              generatedNotifs.push({
                id: `notif-credit-${c.id}`,
                userId: user.id,
                title: `ERC-1155 Tokens Minted: ${c.quantity} tCO₂e`,
                message: `Tokenized carbon credits minted on Polygon Amoy testnet for project '${p.projectName}'.`,
                isRead: false,
                type: "success",
                createdAt: c.issuedAt,
              });
            }
          }
        }
      } else if (user.role === "VERIFIER") {
        // Fetch projects awaiting verification for verifier notification inbox
        const pendingProjects = await prisma.project.findMany({
          where: { status: "SUBMITTED" },
          orderBy: { createdAt: "desc" },
        });

        for (const p of pendingProjects) {
          generatedNotifs.push({
            id: `notif-pending-${p.id}`,
            userId: user.id,
            title: `Pending Verification Audit: ${p.projectName}`,
            message: `A new Blue Carbon project in ${p.district}, ${p.state} (${p.areaHectares} Ha) is ready for site review.`,
            isRead: false,
            type: "info",
            createdAt: p.createdAt,
          });
        }
      }

      return generatedNotifs;
    }

    return dbNotifs;
  }

  async markRead(notificationId, user) {
    return prisma.notification.updateMany({
      where: { id: notificationId, userId: user.id },
      data: { isRead: true },
    }).catch(() => null);
  }

  async markAllRead(user) {
    return prisma.notification.updateMany({
      where: { userId: user.id },
      data: { isRead: true },
    }).catch(() => null);
  }

  async deleteNotification(notificationId, user) {
    return prisma.notification.deleteMany({
      where: { id: notificationId, userId: user.id },
    }).catch(() => null);
  }
}

module.exports = new NotificationService();
