const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

// @route GET /api/users/current [PRIVATE] (Gets the current User)
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    status: "Current Contact",
    contact: req.user,
  });
});

// @route POST /api/users/register [PUBLIC] (Registers a new User)
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Checking for a duplicate email or user name in database and if available then throwing error
  const emailUnavailable = await User.findOne({ email });
  if (emailUnavailable) {
    res.status(404);
    throw new Error("Email is already registered! Try another one!");
  }
  const usernameUnavailable = await User.findOne({ username });
  if (usernameUnavailable) {
    res.status(404);
    throw new Error("Username is already registered! Try another one!");
  }

  // Encrypting password using Hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password : ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      status: "Created the user",
      values: user,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @route POST /api/users/login [PUBLIC] (logins the existing User)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Checking weather the email id is available in the database or not
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Creating a auth-token with a payload
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken: accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid!");
  }
});

module.exports = {
  getCurrentUser,
  registerUser,
  loginUser,
};
