const express = require("express");
const { NotFound } = require("http-errors");
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
const router = express.Router();

const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: "200",
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
});

router.delete("/:id", async (req, res, next) => {
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
});

module.exports = router;
