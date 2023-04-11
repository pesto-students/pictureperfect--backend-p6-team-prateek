const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const role = await user.role;
    const isUserVerified = await user.isUserVerified;
    console.log(role);
    // create a token

    const token = createToken(user._id);

    res.status(200).json({ email, role, isUserVerified, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verify user

const verifyUser = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const filter = { email: userEmail };
    const update = { isUserVerified: true };

    await User.findOneAndUpdate(filter, update);

    res.status(200).json({ userEmail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user

const signupUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.signup(email, password, firstName, lastName);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerStudio = async (req, res) => {
  const {
    studioName,
    studioEmail,
    password,
    studioAddress,
    studioCity,
    studioPincode,
    studioPhoneNumber,
    studioWhatsAppNumber,
    studioProfilePicture,
    studioCategory,
    studioAbout,
    studioDailyRate,
  } = req.body;
  console.log("emailAgain => ", studioEmail);
  try {
    const user = await User.register(
      studioName,
      studioEmail,
      password,
      studioAddress,
      studioCity,
      studioPincode,
      studioPhoneNumber,
      studioWhatsAppNumber,
      studioProfilePicture,
      studioCategory,
      studioAbout,
      studioDailyRate
    );
    // console.log("user => ", user);
    // create a token
    const token = createToken(user._id);
    const email = await user.email;
    const isUserVerified = await user.isUserVerified;

    // res.status(200).json(user);
    res.status(200).json({ email, isUserVerified, token });
  } catch (error) {
    console.log("error => ", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, registerStudio, verifyUser };
