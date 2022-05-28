const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "mail"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\((\d{3})\)[ ](\d{3})[-](\d{4})$/)
    .required(),
});

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await contactsOperations.updateById(id, req.body);
    if (!result) {
      throw new NotFound(
        `Contacts with ${id} NOT FOUND! Try soomething else, please`
      );
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
