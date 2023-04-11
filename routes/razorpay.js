const express = require("express");

const { handleRazorpayPayment } = require("../controllers/razorpayController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all studios routes
// router.use(requireAuth);

router.post("/", handleRazorpayPayment);

module.exports = router;
