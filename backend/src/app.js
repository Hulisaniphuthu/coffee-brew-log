require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const brewsRouter = require("./routes/brews");
const metaRouter = require("./routes/meta");

const app = express();

// CORS origin is read from ENV, never hardcoded, so this works the same
// in local dev and in production behind different domains.
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/brews", brewsRouter);
app.use("/api/meta", metaRouter);

// Fallback 404 handler for unmatched API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

async function start() {
  try {
    await sequelize.authenticate();
    // sync() creates the table if it doesn't exist yet - fine for this
    // small project instead of a full migration setup.
    await sequelize.sync();
    console.log("Database connected and synced.");

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Coffee Brew Log API running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
}

start();

module.exports = app;
