import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pool from "./config/db.js";

import ApiError from "./utils/ApiError.js";
import errorHandler from "./middleware/ErrorHandler.js";
import devUser from "./middleware/DevUser.js";

const app = express();

// Global middleware
app.use(morgan("dev"));
app.use(express.json());

// Server health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Sprintly server is running",
  });
});

// Database health check
app.get("/health/db", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database readiness check failed:", error.message);

    next(new ApiError(503, "Database is unavailable"));
  }
});

// Temporary test route
app.get("/test-error", (req, res, next) => {
  next(new ApiError(404, "Project not found"));
});

// Temporary development-only test

app.get("/test-user", devUser, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      userId: req.user.id,
    },
  });
});


// Centralized error handler
app.use(errorHandler);

export default app;