const express = require("express");

const {
  getStudioData,
  getAllStudios,
  updateStudioName,
  updateStudioContact,
  updateStudioLocation,
  updateStudioEmail,
  updateStudioProfile,
} = require("../controllers/studioController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all studios routes
router.use(requireAuth);

router.get("/", getStudioData);

router.get("/all", getAllStudios);

router.put("/profile/name", updateStudioName);

router.put("/profile/contact", updateStudioContact);

router.put("/profile/location", updateStudioLocation);

router.put("/profile/email", updateStudioEmail);

router.put("/profile/studioProfile", updateStudioProfile);
module.exports = router;
