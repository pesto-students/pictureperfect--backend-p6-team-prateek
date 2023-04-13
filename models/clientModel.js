const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const clientSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

module.exports = model("Client", clientSchema);
