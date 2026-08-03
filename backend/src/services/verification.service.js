const prisma = require("../config/db");

/**
 * verification.service.js — Verifier Workflow & Decision Processing Service
 */
class VerificationService {
  /**
   * Get all projects pending verification (submitted by NGOs)
   */
  async getPendingProjects() {
    return prisma.project.findMany({
      where: {
        status: {
          in: ["SUBMITTED", "UNDER_VERIFICATION"],
        },
      },
      include: {
        owner: { select: { id: true, fullName: true, email: true, organizationName: true } },
        documents: true,
        satelliteReports: { orderBy: { reportDate: "desc" }, take: 1 },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  /**
   * Submit official verification decision for a project
   */
  async submitDecision(verifierUser, projectId, { decision, remarks }) {
    const validDecisions = ["APPROVED", "REJECTED", "NEEDS_REVISION"];
    const normalizedDecision = (decision || "").toUpperCase();

    if (!validDecisions.includes(normalizedDecision)) {
      throw new Error(`Invalid decision '${decision}'. Must be one of: ${validDecisions.join(", ")}`);
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { owner: true },
    });

    if (!project) {
      throw new Error("Project not found.");
    }

    // Map decision to ProjectStatus
    let newProjectStatus = "UNDER_VERIFICATION";
    if (normalizedDecision === "APPROVED") {
      newProjectStatus = "APPROVED";
    } else if (normalizedDecision === "REJECTED") {
      newProjectStatus = "REJECTED";
    } else if (normalizedDecision === "NEEDS_REVISION") {
      newProjectStatus = "DRAFT";
    }

    // 1. Create Verification Record
    const verification = await prisma.verification.create({
      data: {
        projectId,
        verifierId: verifierUser.id,
        decision: normalizedDecision,
        remarks: remarks || "",
      },
    });

    // 2. Update Project Status
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { status: newProjectStatus },
    });

    // 3. Create AuditLog Entry
    await prisma.auditLog.create({
      data: {
        userId: verifierUser.id,
        action: `PROJECT_VERIFICATION_${normalizedDecision}`,
        entity: "Project",
        entityId: projectId,
      },
    }).catch(() => {});

    // 4. Create Notification for NGO Owner
    await prisma.notification.create({
      data: {
        userId: project.ownerId,
        title: `Project Verification Update: ${project.projectName}`,
        message: `Your project '${project.projectName}' verification status was updated to ${normalizedDecision}. Remarks: ${remarks || "No remarks provided."}`,
      },
    }).catch(() => {});

    return {
      verification,
      project: updatedProject,
    };
  }

  /**
   * Get all verification decision records for a project
   */
  async getProjectVerifications(projectId) {
    return prisma.verification.findMany({
      where: { projectId },
      include: {
        verifier: { select: { id: true, fullName: true, email: true, organizationName: true } },
      },
      orderBy: { verifiedAt: "desc" },
    });
  }

  /**
   * Get Verifier Workstation Dashboard Summary Stats
   */
  async getVerifierDashboardStats(verifierId) {
    const [pendingCount, approvedCount, totalProjects] = await Promise.all([
      prisma.project.count({ where: { status: "SUBMITTED" } }),
      prisma.verification.count({ where: { verifierId, decision: "APPROVED" } }),
      prisma.project.count(),
    ]);

    // Calculate total verified area
    const approvedProjects = await prisma.project.findMany({
      where: { status: "APPROVED" },
      select: { areaHectares: true },
    });

    const verifiedHectares = approvedProjects.reduce(
      (sum, p) => sum + parseFloat(p.areaHectares || 0),
      0
    );

    return {
      pendingVerifications: pendingCount,
      approvedCount,
      totalProjects,
      verifiedHectares: parseFloat(verifiedHectares.toFixed(2)),
    };
  }
}

module.exports = new VerificationService();
