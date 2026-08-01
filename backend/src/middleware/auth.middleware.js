const supabase = require("../config/supabase");
const userRepository = require("../repositories/user.repository");

/**
 * auth.middleware.js — Authentication & Auto-Sync Middleware
 *
 * Flow:
 * 1. Extract token from `Authorization` header.
 * 2. Validate token using Supabase Auth client (`supabase.auth.getUser(token)`).
 * 3. Attach `req.user` with user ID, email, and user_metadata (role, name).
 * 4. Sync/upsert profile record into `public.profiles` via Prisma.
 * 5. Call `next()` to proceed.
 */

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No authorization token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Validate token with Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authorization token.",
      });
    }

    const role = user.user_metadata?.role || "NGO";
    const fullName = user.user_metadata?.fullName || user.user_metadata?.full_name || user.email.split("@")[0];
    const organizationName = user.user_metadata?.organizationName || user.user_metadata?.organization_name || "";
    const phoneNumber = user.user_metadata?.phoneNumber || user.user_metadata?.phone_number || "";

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role,
      fullName,
      organizationName,
      phoneNumber,
    };

    // Auto-sync profile to Prisma public.profiles table silently
    userRepository.createProfile({
      id: user.id,
      fullName,
      email: user.email,
      role,
      organizationName,
      phoneNumber,
    }).catch(() => {
      // Ignore duplicate key errors if profile already exists
    });

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(500).json({
      success: false,
      message: "Authentication error occurred.",
    });
  }
};

module.exports = authenticate;
