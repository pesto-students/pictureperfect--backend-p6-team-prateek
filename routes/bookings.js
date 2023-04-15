const express = require("express");

const {
  getBookingData,
  getAllBookings,
  bookingFlow,
} = require("../controllers/bookingController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all studios routes
router.use(requireAuth);

router.get("/", getBookingData);
router.get("/all", getAllBookings);
router.post("/booking", bookingFlow);

module.exports = router;
