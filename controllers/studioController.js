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

module.exports = { getStudioData, getAllStudios };
