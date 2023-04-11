const User = require("./userModel");

const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const bookingFlowSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User" },
  studio: { type: Schema.Types.ObjectId, ref: "User" },
  bookingDate: {
    type: String,
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  userAddress: {
    type: String,
  },
  userAlternateContactNumber: {
    type: String,
  },
  userContactNumber: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userName: {
    type: String,
  },
  userPinCode: {
    type: String,
  },
  totalAmount: {
    type: String,
  },
  numberOfDays: {
    Type: String,
  },
  userSelectCategory: [
    {
      type: String,
    },
  ],
});

module.exports = model("BookingFlow", bookingFlowSchema);
