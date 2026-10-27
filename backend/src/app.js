import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import pool from "./config/db.js";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.get("/health", (req, res) => {
    res.json("Dev desk server is running")
})


app.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.status(200).json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    console.error('Database readiness check failed:', error.message);

    res.status(503).json({
      status: 'error',
      database: 'unavailable',
    });
  }
});
app.get("/notfound", (req, res) => {
    res.status(404).json("404 not found")
})
app.post("/test", (req, res) => {
    const response = req.body;
    res.status(200).json(response);
})
export default app;
