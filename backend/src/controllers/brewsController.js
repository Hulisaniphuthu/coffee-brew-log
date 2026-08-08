const { Brew, BREW_METHODS } = require("../models/Brew");

const REQUIRED_FIELDS = [
  "coffeeName",
  "method",
  "doseGrams",
  "waterMl",
  "brewTimeSeconds",
  "rating",
];

// Basic "no blank fields" guard, mirrored server-side so the API can never
// be tricked into saving an incomplete record, even if the front-end
// validation is bypassed.
function findMissingFields(body) {
  return REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === "";
  });
}

// GET /api/brews?method=Espresso
async function listBrews(req, res) {
  try {
    const { method } = req.query;
    const where = {};
    if (method && BREW_METHODS.includes(method)) {
      where.method = method;
    }
    const brews = await Brew.findAll({ where, order: [["createdAt", "DESC"]] });
    res.status(200).json({ data: brews, count: brews.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brews", details: err.message });
  }
}

// GET /api/brews/:id
async function getBrew(req, res) {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ error: "Brew not found" });
    res.status(200).json({ data: brew });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brew", details: err.message });
  }
}

// POST /api/brews
async function createBrew(req, res) {
  const missing = findMissingFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({ error: "Missing required fields", fields: missing });
  }
  try {
    const brew = await Brew.create(req.body);
    res.status(201).json({ data: brew });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors.map((e) => e.message).join(", ") });
    }
    res.status(500).json({ error: "Failed to create brew", details: err.message });
  }
}

// PUT /api/brews/:id
async function updateBrew(req, res) {
  const missing = findMissingFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({ error: "Missing required fields", fields: missing });
  }
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ error: "Brew not found" });
    await brew.update(req.body);
    res.status(200).json({ data: brew });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors.map((e) => e.message).join(", ") });
    }
    res.status(500).json({ error: "Failed to update brew", details: err.message });
  }
}

// DELETE /api/brews/:id
async function deleteBrew(req, res) {
  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) return res.status(404).json({ error: "Brew not found" });
    await brew.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete brew", details: err.message });
  }
}

module.exports = { listBrews, getBrew, createBrew, updateBrew, deleteBrew, BREW_METHODS };
