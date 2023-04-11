const express = require("express");

const { getCategories, addCategory } = require("../controllers/categoryController");

const router = express.Router();

router.get("/all", getCategories);

router.post("/", addCategory);

module.exports = router;
