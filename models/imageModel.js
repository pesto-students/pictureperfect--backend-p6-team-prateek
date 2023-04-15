const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  album: { type: Schema.Types.ObjectId, ref: "Album" },
  name: {
    type: String,
  },
  imagesUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
