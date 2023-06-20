const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Establishing a connection
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDb;