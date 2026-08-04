const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

/**
 * app.js — Express Application Configuration
 *
 * Configures Express middleware, static uploads, and API routes.
 */

const app = express();

// ─── Security Middleware ───
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ─── CORS ───
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ─── Request Parsing ───
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// ─── Static Uploads Directory ───
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ─── Logging ───
app.use(morgan("dev"));

// ─── Route Imports ───
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const projectRoutes = require("./routes/project.routes");
const satelliteRoutes = require("./routes/satellite.routes");
const verificationRoutes = require("./routes/verification.routes");
const carbonCreditRoutes = require("./routes/carbonCredit.routes");
const notificationRoutes = require("./routes/notification.routes");
const adminRoutes = require("./routes/admin.routes");

// ─── Health Check ───
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KarbonShrunkhala Backend is running",
    data: {
      service: "Express API",
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    },
  });
});

// ─── API Routes ───
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/satellite", satelliteRoutes);
app.use("/api/verifications", verificationRoutes);
app.use("/api/credits", carbonCreditRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// ─── 404 Handler ───
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
