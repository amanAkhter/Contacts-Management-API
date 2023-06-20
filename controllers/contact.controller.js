const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @route GET /api/contacts/ [PRIVATE] (Get all Contacts)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @route GET /api/contacts/:id [PRIVATE] (Get a specific contacts)
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({
    status: "Contact Found",
    contact: contact,
  });
});

// @route POST /api/contacts/:id [PRIVATE] (Create specific contacts)
const postContact = asyncHandler(async (req, res) => {
  const { email, phone, name } = req.body;

  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("Fields are missing");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json({
    status: "Created Succesfully",
    createdContact: contact,
  });
});

// @route PUT /api/contacts/:id [PRIVATE] (Update a specific contacts)
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User donot have permissions to update the contacts of another user!"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(202).json({
    status: "Contact updated",
    updatedContact: updatedContact,
  });
});

// @route DELETE /api/contacts/:id [PRIVATE] (Delete a specific contacts)
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User donot have permissions to delete the contacts of another user!"
    );
  }

  const deletedContact = await Contact.findByIdAndDelete(req.params.id);

  res.status(202).json({
    status: "Contact Deleted",
    deletedContact: deletedContact,
  });
});

module.exports = {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
};
