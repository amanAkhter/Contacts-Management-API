const mongoose = require("mongoose");

// Contact Schema
const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the Contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please add the Email of the contact"],
    },
    phone: {
      type: Number,
      required: [true, "Please add the Phone number of the contact"],
    },
  },
  { timestamps: true }
);

// Modeling the contact's schema
module.exports = mongoose.model("Contact", contactSchema);
