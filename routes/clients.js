const express = require("express");

const { getClientData } = require("../controllers/clientController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all endUser routes
router.use(requireAuth);

router.get("/", getClientData);

module.exports = router;
