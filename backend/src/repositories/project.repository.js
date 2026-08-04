const prisma = require("../config/db");

/**
 * ProjectRepository — Handles data access for Projects and ProjectDocuments
 * Follows 08-Folder-Structure.md & 03-Backend-Schema.md
 */
class ProjectRepository {
  async findById(id) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, fullName: true, email: true, organizationName: true } },
        documents: true,
        satelliteReports: { orderBy: { reportDate: "desc" }, take: 1 },
        verifications: { orderBy: { verifiedAt: "desc" } },
        carbonCredits: true,
      },
    });
  }

  async findAll(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.ecosystemType) where.ecosystemType = filters.ecosystemType;
    if (filters.state) where.state = filters.state;
    if (filters.ownerId) where.ownerId = filters.ownerId;

    return prisma.project.findMany({
      where,
      include: {
        owner: { select: { fullName: true, organizationName: true } },
        documents: true,
        satelliteReports: { orderBy: { reportDate: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(projectData) {
    return prisma.project.create({
      data: projectData,
    });
  }

  async update(id, projectData) {
    return prisma.project.update({
      where: { id },
      data: projectData,
    });
  }

  async delete(id) {
    return prisma.project.delete({
      where: { id },
    });
  }

  async addDocument(documentData) {
    return prisma.projectDocument.create({
      data: documentData,
    });
  }

  async findDocumentsByProjectId(projectId) {
    return prisma.projectDocument.findMany({
      where: { projectId },
      orderBy: { uploadedAt: "desc" },
    });
  }
}

module.exports = new ProjectRepository();
