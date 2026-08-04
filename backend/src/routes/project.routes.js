const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const authenticate = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

/**
 * project.routes.js — Project API Endpoint Definitions
 * Mounted at /api/projects
 */

// All endpoints require JWT authentication
router.use(authenticate);

// GET /api/projects — List all projects (filtered by role)
router.get("/", projectController.getProjects);

// GET /api/projects/:id — Get detailed project by ID
router.get("/:id", projectController.getProjectById);

// POST /api/projects — Create project (NGO & Admin only) with GeoJSON & evidence uploads
router.post(
  "/",
  authorizeRoles("NGO", "GOVERNMENT"),
  upload.fields([
    { name: "geojsonFile", maxCount: 1 },
    { name: "evidenceFile", maxCount: 5 },
  ]),
  projectController.createProject
);

// PUT /api/projects/:id — Update project details or status (NGO & Admin only)
router.put("/:id", authorizeRoles("NGO", "GOVERNMENT"), projectController.updateProject);

// DELETE /api/projects/:id — Delete draft project (NGO & Admin only)
router.delete("/:id", authorizeRoles("NGO", "GOVERNMENT"), projectController.deleteProject);

// POST /api/projects/:id/documents — Upload additional evidence document (NGO & Admin only)
router.post(
  "/:id/documents",
  authorizeRoles("NGO", "GOVERNMENT"),
  upload.single("document"),
  projectController.uploadDocument
);

module.exports = router;
