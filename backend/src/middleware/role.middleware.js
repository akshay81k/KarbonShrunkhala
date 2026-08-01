/**
 * role.middleware.js — Role Authorization Middleware
 *
 * Purpose: Restricts route access based on allowed user roles.
 *
 * Roles:
 * - NGO
 * - VERIFIER
 * - GOVERNMENT
 * - CORPORATE
 *
 * Usage:
 * router.get("/ngo-only", authenticate, authorizeRoles("NGO"), handler)
 * router.get("/admin-or-verifier", authenticate, authorizeRoles("GOVERNMENT", "VERIFIER"), handler)
 */

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Authentication required.",
      });
    }

    const userRole = (req.user.role || "").toUpperCase();
    const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' is not authorized to access this resource.`,
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
