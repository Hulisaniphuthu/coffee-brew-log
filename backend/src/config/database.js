const path = require("path");
const { Sequelize } = require("sequelize");

// Read the database file path from ENV, falling back to a sensible default.
// Using an ENV var means no secrets/paths are hardcoded in source.
const storagePath = process.env.DATABASE_PATH
  ? path.resolve(__dirname, "../../", process.env.DATABASE_PATH)
  : path.resolve(__dirname, "../../data/brews.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});

module.exports = sequelize;
