require("dotenv").config();
const app = require("./app");

/**
 * server.js — HTTP Server Entry Point
 *
 * Purpose: Starts the Express server on the configured port.
 * This is the entry point specified in package.json.
 *
 * Interactions:
 * - Imports the configured Express app from app.js.
 * - Reads PORT from environment variables (default: 5000).
 */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   KarbonShrunkhala Backend                       ║
║   Server running on http://localhost:${PORT}        ║
║   Environment: ${(process.env.NODE_ENV || "development").padEnd(15)}          ║
║                                                  ║
╚══════════════════════════════════════════════════╝
  `);
});
