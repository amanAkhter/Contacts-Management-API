const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken, getCurrentUser); // validating the login token to get the cuurent user data

module.exports = router;
