const express = require("express");

const { getCities,addCity } = require("../controllers/cityController");

const router = express.Router();

router.get("/all", getCities);

router.post("/",addCity)

module.exports = router;
