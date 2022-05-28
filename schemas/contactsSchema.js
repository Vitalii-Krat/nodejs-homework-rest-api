const Joi = require("joi");

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

module.exports = contactSchema;
