const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  studio: { type: Schema.Types.ObjectId, ref: "PhotoStudio" },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = mongoose.model("Album", albumSchema);
