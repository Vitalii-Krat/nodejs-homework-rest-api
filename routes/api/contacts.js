const express = require("express");

const { validation, controllerWrapper } = require("../../middleware");
const { contactsSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post(
  "/",
  validation(contactsSchema),
  controllerWrapper(ctrl.addContacts)
);

router.put(
  "/:id",
  validation(contactsSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:id", controllerWrapper(ctrl.removeById));

module.exports = router;
