const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createAlbum,
  albumdetails,
  albumData,
  imageData,
  deleteAlbum,
} = require("../controllers/albumController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.post("/album", upload.single("image"), createAlbum);

router.get("/", albumdetails);

router.get("/:id", albumData);

router.get("/image/:id", imageData);

router.delete("/delete/:id", deleteAlbum);

module.exports = router;
