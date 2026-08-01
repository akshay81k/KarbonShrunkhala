const supabase = require("../config/supabase");

/**
 * auth.middleware.js — Authentication Middleware
 *
 * Purpose: Protects API endpoints by validating Supabase Auth JWT tokens
 * sent in the Authorization header (`Bearer <token>`).
 *
 * Flow:
 * 1. Extract token from `Authorization` header.
 * 2. Validate token using Supabase Auth client (`supabase.auth.getUser(token)`).
 * 3. Attach `req.user` with user ID, email, and user_metadata (role, name).
 * 4. Call `next()` to proceed or return `401 Unauthorized` on failure.
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

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || "NGO",
      fullName: user.user_metadata?.fullName || user.user_metadata?.full_name || user.email.split("@")[0],
      organizationName: user.user_metadata?.organizationName || user.user_metadata?.organization_name || "",
      phoneNumber: user.user_metadata?.phoneNumber || user.user_metadata?.phone_number || "",
    };

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
