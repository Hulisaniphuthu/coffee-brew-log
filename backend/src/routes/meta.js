const express = require("express");
const router = express.Router();
const { BREW_METHODS } = require("../models/Brew");

// GET /api/meta/methods - lets the front-end build its method dropdown
// from a single source of truth instead of duplicating the list.
router.get("/methods", (req, res) => {
  res.status(200).json({ data: BREW_METHODS });
});

module.exports = router;
