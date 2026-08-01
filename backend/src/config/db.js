const { PrismaClient } = require("@prisma/client");

/**
 * db.js — Prisma Database Client Singleton
 *
 * Purpose: Provides a single, shared PrismaClient instance
 * across the backend repository layer to avoid connection exhaustion.
 */

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
