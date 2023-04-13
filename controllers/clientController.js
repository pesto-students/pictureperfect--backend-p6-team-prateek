const User = require("../models/userModel");
const Client = require("../models/clientModel");
const mongoose = require("mongoose");

const getClientData = async (req, res) => {
  const user_id = req.user._id;

  const user = await User.findOne({ _id: user_id }).populate({
    path: "userData",
  });

  console.log(user);

  res.status(200).json(user.userData);
};

const updateBasicDetails = async (req, res) => {
  const user_id = req.user._id;
  const { editUserFirstName, editUserLastName } = req.body;

  const userToBeUpdated = await User.findOne({ _id: user_id });

  const client_id = userToBeUpdated.userData;

  const clientToBeUpdated = await Client.findOneAndUpdate(
    { _id: client_id },
    { firstName: editUserFirstName, lastName: editUserLastName },
    { new: true, upsert: true }
  );

  console.log(clientToBeUpdated);

  res.status(200).json("Success" + clientToBeUpdated);
};

const updateEmail = async (req, res) => {
  const user_id = req.user._id;
  const { editUserEmail } = req.body;

  const userToBeUpdated = await User.findOneAndUpdate(
    { _id: user_id },
    { email: editUserEmail },
    { new: true, upsert: true }
  );

  console.log(userToBeUpdated);

  res.status(200).json("Success" + userToBeUpdated);
};

module.exports = { getClientData, updateBasicDetails, updateEmail };
