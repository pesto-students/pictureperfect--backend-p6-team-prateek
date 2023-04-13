const express = require("express");

const {
  getClientData,
  updateBasicDetails,
  updateEmail,
} = require("../controllers/clientController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all endUser routes
router.use(requireAuth);

router.get("/", getClientData);

router.put("/profile/basicDetails/", updateBasicDetails);

router.put("/profile/email/", updateEmail);

module.exports = router;
