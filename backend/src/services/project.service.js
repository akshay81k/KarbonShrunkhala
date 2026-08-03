const projectRepository = require("../repositories/project.repository");
const fs = require("fs");
const path = require("path");

/**
 * project.service.js — Project Business Logic Service
 */
class ProjectService {
  /**
   * Create a new project (NGO role)
   */
  async createProject(user, projectData, files = {}) {
    // 1. Validate mandatory fields
    if (!projectData.name || !projectData.ecosystemType || !projectData.areaHectares) {
      throw new Error("Project name, ecosystem type, and area in hectares are required.");
    }

    // 2. Handle GeoJSON payload (either string/object in req.body or uploaded file)
    let geojsonUrl = null;

    if (projectData.geojsonBoundary) {
      try {
        const uploadsDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filename = `geojson-${Date.now()}-${Math.round(Math.random() * 1e9)}.json`;
        const filePath = path.join(uploadsDir, filename);

        let content = projectData.geojsonBoundary;
        if (typeof content === "object") {
          content = JSON.stringify(content, null, 2);
        }

        fs.writeFileSync(filePath, content, "utf8");
        geojsonUrl = `/uploads/${filename}`;
      } catch (err) {
        console.warn("Failed to save GeoJSON boundary file:", err.message);
      }
    } else if (files.geojsonFile && files.geojsonFile[0]) {
      geojsonUrl = `/uploads/${files.geojsonFile[0].filename}`;
    }

    // 3. Construct project record matching Prisma Project model schema
    const newProject = await projectRepository.create({
      projectName: projectData.name,
      description: projectData.description || "",
      ecosystemType: projectData.ecosystemType.toUpperCase(),
      areaHectares: parseFloat(projectData.areaHectares),
      state: projectData.state || "West Bengal",
      district: projectData.district || "South 24 Parganas",
      geojsonUrl,
      status: "DRAFT",
      ownerId: user.id,
    });

    // 4. Attach evidence document if provided
    if (files.evidenceFile && files.evidenceFile[0]) {
      const file = files.evidenceFile[0];
      await projectRepository.addDocument({
        projectId: newProject.id,
        fileName: file.originalname,
        fileType: file.mimetype || "application/pdf",
        storageUrl: `/uploads/${file.filename}`,
        uploadedBy: user.id,
      });
    }

    // Read saved GeoJSON if present for immediate response
    let geojsonBoundary = null;
    if (geojsonUrl) {
      try {
        const fullPath = path.join(__dirname, "../../", geojsonUrl);
        if (fs.existsSync(fullPath)) {
          geojsonBoundary = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        }
      } catch (err) {}
    }

    return {
      ...newProject,
      name: newProject.projectName,
      geojsonBoundary,
    };
  }

  /**
   * Get all projects based on user role and filters
   */
  async getProjects(user, filters = {}) {
    const queryFilters = { ...filters };

    if (user.role === "NGO") {
      queryFilters.ownerId = user.id;
    }

    const projects = await projectRepository.findAll(queryFilters);

    return projects.map((p) => ({
      ...p,
      name: p.projectName,
    }));
  }

  /**
   * Get single project by ID with GeoJSON boundary content
   */
  async getProjectById(projectId) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    let geojsonBoundary = null;
    if (project.geojsonUrl) {
      try {
        const fullPath = path.join(__dirname, "../../", project.geojsonUrl);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, "utf8");
          geojsonBoundary = JSON.parse(content);
        }
      } catch (err) {
        console.warn("Failed to read geojson file:", err.message);
      }
    }

    return {
      ...project,
      name: project.projectName,
      geojsonBoundary,
    };
  }

  /**
   * Update project details or status
   */
  async updateProject(projectId, user, updateData) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    if (user.role === "NGO" && project.ownerId !== user.id) {
      throw new Error("Unauthorized to modify this project.");
    }

    const dataToUpdate = {};
    if (updateData.name) dataToUpdate.projectName = updateData.name;
    if (updateData.description) dataToUpdate.description = updateData.description;
    if (updateData.ecosystemType) dataToUpdate.ecosystemType = updateData.ecosystemType.toUpperCase();
    if (updateData.areaHectares) dataToUpdate.areaHectares = parseFloat(updateData.areaHectares);
    if (updateData.state) dataToUpdate.state = updateData.state;
    if (updateData.district) dataToUpdate.district = updateData.district;
    if (updateData.status) dataToUpdate.status = updateData.status.toUpperCase();

    const updated = await projectRepository.update(projectId, dataToUpdate);

    let geojsonBoundary = null;
    if (updated.geojsonUrl) {
      try {
        const fullPath = path.join(__dirname, "../../", updated.geojsonUrl);
        if (fs.existsSync(fullPath)) {
          geojsonBoundary = JSON.parse(fs.readFileSync(fullPath, "utf8"));
        }
      } catch (err) {}
    }

    return {
      ...updated,
      name: updated.projectName,
      geojsonBoundary,
    };
  }

  /**
   * Delete draft project
   */
  async deleteProject(projectId, user) {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    if (user.role === "NGO" && project.ownerId !== user.id) {
      throw new Error("Unauthorized to delete this project.");
    }

    if (project.status !== "DRAFT" && user.role !== "GOVERNMENT") {
      throw new Error("Only draft projects can be deleted.");
    }

    return projectRepository.delete(projectId);
  }

  /**
   * Add document to project
   */
  async addProjectDocument(projectId, user, file, docType = "EVIDENCE") {
    return projectRepository.addDocument({
      projectId,
      fileName: file.originalname,
      fileType: docType || file.mimetype || "application/pdf",
      storageUrl: `/uploads/${file.filename}`,
      uploadedBy: user.id,
    });
  }
}

module.exports = new ProjectService();
