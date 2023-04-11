const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    unique: true
  },
  categoryValue: {
    type: String,
    unique: true
  },
});

module.exports = model("Category", categorySchema);
