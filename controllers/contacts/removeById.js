const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(
      `Contacts with ID: ${id} NOT FOUND! Try soomething else, please`
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
};

module.exports = removeById;
