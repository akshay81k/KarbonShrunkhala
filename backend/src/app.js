const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

/**
 * app.js — Express Application Configuration
 *
 * Purpose: Configures Express middleware and routes.
 * This file is separate from server.js to allow for testing
 * without starting the HTTP server.
 *
 * Interactions:
 * - Imported by server.js to start the HTTP server.
 * - Routes will be registered here in future phases.
 */

const app = express();

// ─── Security Middleware ───
app.use(helmet());

// ─── CORS ───
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ─── Request Parsing ───
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Logging ───
app.use(morgan("dev"));

// ─── Route Imports ───
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");

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
