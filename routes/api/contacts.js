const express = require("express");

const { auth, validation, controllerWrapper } = require("../../middleware");
const { joiSchema, joiFavoriteSchema } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, controllerWrapper(ctrl.getAll));

router.get("/:id", controllerWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(joiSchema),
  controllerWrapper(ctrl.addContacts)
);

router.put("/:id", validation(joiSchema), controllerWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(joiFavoriteSchema),
  controllerWrapper(ctrl.updateFavorite)
);

router.delete("/:id", controllerWrapper(ctrl.removeById));

module.exports = router;
