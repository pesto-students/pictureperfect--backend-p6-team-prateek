const express = require("express");

const {
  signupUser,
  loginUser,
  registerStudio,
  verifyUser
  //getRole
} = require("../controllers/userController");

const router = express.Router();

// login route

router.post("/login", loginUser);

// signup route

router.post("/signup", signupUser);

// register studio route

router.post("/register-studio", registerStudio);

// verfiy user route

router.put("/verifiedUser",verifyUser);

//router.get('',getRole);

module.exports = router;
