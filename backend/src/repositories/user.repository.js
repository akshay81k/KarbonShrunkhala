const prisma = require("../config/db");

/**
 * UserRepository — Handles data access for Profiles and Users
 * Follows 08-Folder-Structure.md & 03-Backend-Schema.md
 */
class UserRepository {
  async findById(id) {
    return prisma.profile.findUnique({
      where: { id },
    });
  }

  async findByEmail(email) {
    return prisma.profile.findUnique({
      where: { email },
    });
  }

  async createProfile(data) {
    return prisma.profile.create({
      data: {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        role: data.role || "NGO",
        organizationName: data.organizationName,
        phoneNumber: data.phoneNumber,
        avatarUrl: data.avatarUrl,
      },
    });
  }

  async updateProfile(id, data) {
    return prisma.profile.update({
      where: { id },
      data,
    });
  }

  async findAllByRole(role) {
    return prisma.profile.findMany({
      where: { role },
      orderBy: { createdAt: "desc" },
    });
  }
}

module.exports = new UserRepository();
