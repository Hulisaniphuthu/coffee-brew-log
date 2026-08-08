const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Allowed brew methods - used for both validation and the front-end filter dropdown.
const BREW_METHODS = [
  "Pour Over",
  "French Press",
  "Espresso",
  "AeroPress",
  "Cold Brew",
  "Moka Pot",
];

const Brew = sequelize.define(
  "Brew",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coffeeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Coffee name is required" } },
    },
    method: {
      type: DataTypes.ENUM(...BREW_METHODS),
      allowNull: false,
      validate: { notEmpty: { msg: "Brew method is required" } },
    },
    doseGrams: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Coffee dose (g) is required" },
        min: { args: [0.1], msg: "Dose must be greater than 0" },
      },
    },
    waterMl: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Water amount (ml) is required" },
        min: { args: [0.1], msg: "Water must be greater than 0" },
      },
    },
    brewTimeSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Brew time (seconds) is required" },
        min: { args: [1], msg: "Brew time must be greater than 0" },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Rating is required" },
        min: { args: [1], msg: "Rating must be between 1 and 5" },
        max: { args: [5], msg: "Rating must be between 1 and 5" },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "brews",
    timestamps: true,
  }
);

module.exports = { Brew, BREW_METHODS };
