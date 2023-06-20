const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");
const validateToken = require("../middleware/validateTokenHandler");

// Validating token so that only validated user can access all the routes
router.use(validateToken);

// making different routes for different HTTP methods (based on their requests)
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
