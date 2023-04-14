const User = require("../models/userModel");
const PhotoStudio = require("../models/photoStudioModel");
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

const updateStudioName = async (req, res) => {
  const user_id = req.user._id;
  const { studioNameValue } = req.body;

  const userToBeUpdated = await User.findOne({ _id: user_id });

  const studio_id = userToBeUpdated.userData;

  const studioToBeUpdated = await PhotoStudio.findOneAndUpdate(
    { _id: studio_id },
    { studioName: studioNameValue },
    { new: true, upsert: true }
  );

  console.log(studioToBeUpdated);

  res.status(200).json("Success" + studioToBeUpdated);
};

const updateStudioContact = async (req, res) => {};

const updateStudioLocation = async (req, res) => {};

const updateStudioEmail = async (req, res) => {
  const user_id = req.user._id;
  const { studioEmailValue } = req.body;
  try {
    const exists = await User.findOne({ email: studioEmailValue });

    if (exists) {
      throw Error("Email aready in use by another studio");
    }

    const userToBeUpdated = await User.findOneAndUpdate(
      { _id: user_id },
      { email: studioEmailValue },
      { new: true, upsert: true }
    );

    console.log(userToBeUpdated);

    res.status(200).json("Success" + userToBeUpdated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
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
