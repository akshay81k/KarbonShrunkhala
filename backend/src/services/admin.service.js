const prisma = require("../config/db");
const supabase = require("../config/supabase");
const crypto = require("crypto");

class AdminService {
  /**
   * Fetch all registered Verifier accounts
   */
  async getVerifiers() {
    return prisma.profile.findMany({
      where: { role: "VERIFIER" },
      select: {
        id: true,
        email: true,
        fullName: true,
        organizationName: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Provision a new Verifier account in Supabase Auth & PostgreSQL
   */
  async createVerifier({ fullName, organizationName, email, password, phoneNumber }) {
    if (!email || !password || !fullName) {
      throw new Error("Full name, email, and password are required.");
    }

    // Check if profile already exists in DB
    const existing = await prisma.profile.findUnique({ where: { email } });
    if (existing) {
      throw new Error("A user account with this email address already exists.");
    }

    let userId = null;

    // 1. Attempt Supabase Auth user creation
    try {
      if (supabase && supabase.auth) {
        if (supabase.auth.admin && typeof supabase.auth.admin.createUser === "function") {
          const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              full_name: fullName,
              organization_name: organizationName || "National Verifier Organization",
              role: "VERIFIER",
            },
          });
          if (!error && data?.user) {
            userId = data.user.id;
          }
        }

        if (!userId && typeof supabase.auth.signUp === "function") {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                organization_name: organizationName || "National Verifier Organization",
                role: "VERIFIER",
              },
            },
          });
          if (!error && data?.user) {
            userId = data.user.id;
          }
        }
      }
    } catch (err) {
      console.warn("Supabase Auth create verifier warning:", err.message);
    }

    // Fallback ID if Supabase Auth client is in local dev mode
    if (!userId) {
      userId = crypto.randomUUID();
    }

    // 2. Create Verifier Profile record in PostgreSQL
    const verifierProfile = await prisma.profile.create({
      data: {
        id: userId,
        email,
        fullName,
        organizationName: organizationName || "National Verifier Organization",
        phoneNumber: phoneNumber || null,
        role: "VERIFIER",
      },
    });

    return verifierProfile;
  }
}

module.exports = new AdminService();
