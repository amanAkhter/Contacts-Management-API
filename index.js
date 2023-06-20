const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contact.routes");
const userRoute = require("./routes/user.routes");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const app = express();

// Creating the connection to database
connectDb();

// Parsing the recieved data to json
app.use(bodyParser.json());

// Middleware to manage the routes of contacts
app.use("/api/contacts", contactRoute);

// Middleware to manage the routes of users
app.use("/api/users", userRoute);

// Middleware to handle errors
app.use(errorHandler);

app.listen(port, () => {
  // Starting the server with the specified port
});
