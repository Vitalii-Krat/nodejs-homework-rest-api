const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw new NotFound(
        `Contacts with ${id} NOT FOUND! Try soomething else, please`
      );
    }
    res.json({
      status: "success",
      code: "200",
      data: {
        result,
      },
    });
  } catch (error) {
    next();
  }
};

module.exports = getById;
