const User = require("../models/userModel");
const mongoose = require("mongoose");

const getClientData = async (req, res) => {
 
  const user_id = req.user._id;

  const user = await User.findOne({ _id: user_id }).populate({
    path: "userData",
  });

  console.log(user);

  res.status(200).json(user.userData);
};

module.exports = { getClientData };
