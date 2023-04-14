const User = require("../models/userModel");
const mongoose = require("mongoose");

const getStudioData = async (req, res) => {
  const user_id = req.user._id;

  const user = await User.findOne({ _id: user_id }).populate({
    path: "userData",
  });

  console.log(user);

  res.status(200).json(user.userData);
};

const getAllStudios = async (req, res) => {
  let studiosList = [];

  const studios = await User.find({
    isUserVerified: true,
    role: "PhotoStudio",
  })
    .populate("userData")
    .then((studios) => {
      studios.map((studio) => studiosList.push(studio.userData));
    });

  res.status(200).json(studiosList);
};

const updateStudioName = async (req, res) => {};

const updateStudioContact = async (req, res) => {};

const updateStudioLocation = async (req, res) => {};

const updateStudioEmail = async (req, res) => {};
const updateStudioProfile = async (req, res) => {};

module.exports = {
  getStudioData,
  getAllStudios,
  updateStudioName,
  updateStudioContact,
  updateStudioLocation,
  updateStudioEmail,
  updateStudioProfile,
};
