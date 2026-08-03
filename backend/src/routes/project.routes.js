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

// POST /api/projects — Create project (NGO only) with GeoJSON & evidence uploads
router.post(
  "/",
  authorizeRoles("NGO"),
  upload.fields([
    { name: "geojsonFile", maxCount: 1 },
    { name: "evidenceFile", maxCount: 5 },
  ]),
  projectController.createProject
);

// PUT /api/projects/:id — Update project details or status
router.put("/:id", projectController.updateProject);

// DELETE /api/projects/:id — Delete draft project
router.delete("/:id", projectController.deleteProject);

// POST /api/projects/:id/documents — Upload additional evidence document
router.post(
  "/:id/documents",
  upload.single("document"),
  projectController.uploadDocument
);

module.exports = router;
