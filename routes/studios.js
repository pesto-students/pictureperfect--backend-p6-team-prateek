const express = require("express");

const {
  getStudioData,
  getAllStudios,
} = require("../controllers/studioController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all studios routes
router.use(requireAuth);

router.get("/", getStudioData);
router.get("/all", getAllStudios);
module.exports = router;
