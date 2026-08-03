const projectService = require("../services/project.service");

/**
 * project.controller.js — Project Controller
 */
class ProjectController {
  async createProject(req, res) {
    try {
      const project = await projectService.createProject(req.user, req.body, req.files);
      return res.status(201).json({
        success: true,
        message: "Project created successfully.",
        data: project,
      });
    } catch (err) {
      console.error("Create Project Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to create project.",
      });
    }
  }

  async getProjects(req, res) {
    try {
      const projects = await projectService.getProjects(req.user, req.query);
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (err) {
      console.error("Get Projects Error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch projects.",
      });
    }
  }

  async getProjectById(req, res) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      return res.status(200).json({
        success: true,
        data: project,
      });
    } catch (err) {
      console.error("Get Project By ID Error:", err);
      return res.status(404).json({
        success: false,
        message: err.message || "Project not found.",
      });
    }
  }

  async updateProject(req, res) {
    try {
      const updated = await projectService.updateProject(req.params.id, req.user, req.body);
      return res.status(200).json({
        success: true,
        message: "Project updated successfully.",
        data: updated,
      });
    } catch (err) {
      console.error("Update Project Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to update project.",
      });
    }
  }

  async deleteProject(req, res) {
    try {
      await projectService.deleteProject(req.params.id, req.user);
      return res.status(200).json({
        success: true,
        message: "Project deleted successfully.",
      });
    } catch (err) {
      console.error("Delete Project Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to delete project.",
      });
    }
  }

  async uploadDocument(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No document file provided." });
      }
      const document = await projectService.addProjectDocument(
        req.params.id,
        req.user,
        req.file,
        req.body.fileType || "EVIDENCE"
      );
      return res.status(201).json({
        success: true,
        message: "Document uploaded successfully.",
        data: document,
      });
    } catch (err) {
      console.error("Upload Document Error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Failed to upload document.",
      });
    }
  }
}

module.exports = new ProjectController();
