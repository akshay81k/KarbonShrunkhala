const prisma = require("../config/db");

/**
 * VerificationRepository — Handles verifier decisions and satellite reports
 * Follows 08-Folder-Structure.md & 03-Backend-Schema.md
 */
class VerificationRepository {
  async createVerification(verificationData) {
    return prisma.verification.create({
      data: verificationData,
      include: {
        project: true,
        verifier: { select: { fullName: true, organizationName: true } },
      },
    });
  }

  async findVerificationsByProjectId(projectId) {
    return prisma.verification.findMany({
      where: { projectId },
      include: { verifier: { select: { fullName: true, email: true } } },
      orderBy: { verifiedAt: "desc" },
    });
  }

  async createSatelliteReport(reportData) {
    return prisma.satelliteReport.create({
      data: reportData,
    });
  }

  async findSatelliteReportsByProjectId(projectId) {
    return prisma.satelliteReport.findMany({
      where: { projectId },
      orderBy: { reportDate: "desc" },
    });
  }
}

module.exports = new VerificationRepository();
