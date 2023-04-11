const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const photoStudioSchema = new Schema({
  studio: { type: Schema.Types.ObjectId, ref: "User" },
  studioName: {
    type: String,
  },
  studioPhoneNumber: {
    type: String,
  },
  studioWhatsAppNumber: {
    type: String,
  },

  studioAddress: {
    type: String,
  },
  studioCity: {
    type: String,
  },
  studioPincode: {
    type: String,
  },
  studioCategory: [
    {
      type: String,
    },
  ],
  studioDailyRate: {
    type: String,
  },

  studioProfilePicture: {
    type: String,
  },
  studioAbout: {
    type: String,
  },

  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = model("PhotoStudio", photoStudioSchema);
