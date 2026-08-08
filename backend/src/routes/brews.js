const express = require("express");
const router = express.Router();
const {
  listBrews,
  getBrew,
  createBrew,
  updateBrew,
  deleteBrew,
} = require("../controllers/brewsController");

router.get("/", listBrews);
router.get("/:id", getBrew);
router.post("/", createBrew);
router.put("/:id", updateBrew);
router.delete("/:id", deleteBrew);

module.exports = router;
