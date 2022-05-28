const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound(
        `Contacts with ${id} NOT FOUND! Try soomething else, please`
      );
    }
    // res.status(204).json()
    res.json({
      status: "success",
      code: 200,
      message: "Product deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;