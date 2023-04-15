const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const citySchema = new Schema({
  cityName: {
    type: String,
    unique: true,
  },
});

module.exports = model("City", citySchema);
