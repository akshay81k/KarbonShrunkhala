const prisma = require("../config/db");

/**
 * MarketplaceRepository — Handles CarbonCredit, MarketplaceListing, Transaction, ESGCertificate
 * Follows 08-Folder-Structure.md & 03-Backend-Schema.md
 */
class MarketplaceRepository {
  async issueCarbonCredit(creditData) {
    return prisma.carbonCredit.create({
      data: creditData,
    });
  }

  async findCreditByProjectId(projectId) {
    return prisma.carbonCredit.findMany({
      where: { projectId },
      orderBy: { issuedAt: "desc" },
    });
  }

  async createListing(listingData) {
    return prisma.marketplaceListing.create({
      data: listingData,
    });
  }

  async findActiveListings(filters = {}) {
    const where = { status: "ACTIVE" };
    if (filters.maxPrice) where.pricePerCredit = { lte: filters.maxPrice };

    return prisma.marketplaceListing.findMany({
      where,
      include: {
        credit: { include: { project: true } },
        seller: { select: { fullName: true, organizationName: true } },
      },
      orderBy: { listedAt: "desc" },
    });
  }

  async createTransaction(transactionData) {
    return prisma.transaction.create({
      data: transactionData,
      include: {
        listing: { include: { credit: { include: { project: true } } } },
        buyer: { select: { fullName: true, email: true } },
      },
    });
  }

  async createESGCertificate(certificateData) {
    return prisma.eSGCertificate.create({
      data: certificateData,
    });
  }

  async findCertificateById(id) {
    return prisma.eSGCertificate.findUnique({
      where: { id },
      include: {
        transaction: {
          include: {
            buyer: true,
            listing: { include: { credit: { include: { project: true } } } },
          },
        },
      },
    });
  }
}

module.exports = new MarketplaceRepository();
