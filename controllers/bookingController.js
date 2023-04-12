const User = require("../models/userModel");
const BookingFlow = require("../models/bookingFlowModel");
const mongoose = require("mongoose");
const shortid = require("shortid");

const getBookingData = async (req, res) => {
  const { email } = req.body;

  const userData = await User.findOne({
    email,
  });

  res.status(200).json(userData.bookingFlowData);
};

const getAllBookings = async (req, res) => {
  const user_id = req.user._id;

  const bookingData = await User.findOne({ _id: user_id }).populate({
    path: "bookingFlowData",
    populate: {
      path: "studio",
      populate: {
        path: "userData",
      },
    },
  });

  res.status(200).json(bookingData.bookingFlowData);
};

const bookingFlow = async (req, res) => {
  const user_id = req.user._id;

  const clientFromDb = await User.findOne({ _id: user_id });

  const {
    studio,
    bookingDate,
    fromDate,
    toDate,
    userAddress,
    userAlternateContactNumber,
    userContactNumber,
    userEmail,
    userName,
    userPinCode,
    userSelectCategory,
    totalAmount,
    numberOfDays,
  } = req.body.finalBookingData;

  const studioFromDb = await User.findOne({ _id: studio });
  const newBookingId = shortid.generate();
  try {
    const booking = new BookingFlow({
      client: clientFromDb._id,
      studio: studio,
      bookingId: newBookingId,
      bookingDate,
      fromDate,
      toDate,
      userAddress,
      userAlternateContactNumber,
      userContactNumber,
      userEmail,
      userName,
      userPinCode,
      userSelectCategory,
      totalAmount,
      numberOfDays,
    });

    await booking.save();

    clientFromDb.bookingFlowData.push(booking);

    await clientFromDb.save();

    studioFromDb.bookingFlowData.push(booking);

    await studioFromDb.save();

    res.status(200).json(newBookingId);
  } catch (error) {
    console.log("error => ", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBookingData, getAllBookings, bookingFlow };
