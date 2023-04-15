const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../s3");
const randomString = require("randomstring");
const validator = require("validator");
const Client = require("./clientModel");
const PhotoStudio = require("./photoStudioModel");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Client", "PhotoStudio"],
    required: true,
  },
  isUserVerified: {
    type: Boolean,
    required: true,
  },
  userData: { type: Schema.Types.ObjectId, refPath: "role" },
  bookingFlowData: [{ type: Schema.Types.ObjectId, ref: "BookingFlow" }],
});

// static signup method

userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not strong enough");
  // }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email aready in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const role = "Client";

  const user = await this.create({
    email,
    password: hash,
    role,
    isUserVerified: false,
  });

  const client = await new Client({
    client: user._id,
    firstName,
    lastName,
  });

  await client.save();

  user.userData = client;

  await user.save();

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // find user in db

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect username or password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect username or password");
  }
  return user;
};

// register studio

userSchema.statics.register = async function (
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
) {
  //validation
  if (!studioEmail || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(studioEmail)) {
    throw Error("Email is not valid");
  }

  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not strong enough");
  // }
  const exists = await this.findOne({ email: studioEmail });

  if (exists) {
    throw Error("Email aready in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const role = "PhotoStudio";

  const user = await this.create({
    email: studioEmail,
    password: hash,
    role,
    isUserVerified: false,
  });

  const profilePictureName =
    "studioPP" +
    randomString.generate({
      length: 8,
      charset: "alphanumeric",
    });

  const { Location } = await uploadImage(
    studioProfilePicture,
    profilePictureName
  );

  const photoStudioData = new PhotoStudio({
    studio: user._id,
    studioName,
    studioPhoneNumber,
    studioWhatsAppNumber,
    studioAddress,
    studioCity,
    studioPincode,
    studioCategory,
    studioDailyRate,
    studioProfilePicture: Location,
    studioAbout,
  });

  await photoStudioData.save();

  user.userData = photoStudioData;

  await user.save();

  return user;
};

module.exports = model("User", userSchema);
