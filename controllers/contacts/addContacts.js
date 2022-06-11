// const contactsOperations = require("../../models/contacts");
const { Contact } = require("../../models");

const addContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContacts;
