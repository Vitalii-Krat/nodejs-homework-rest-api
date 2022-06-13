const express = require("express");

const { auth, validation, controllerWrapper } = require("../../middleware");
const { auth: ctrl } = require("../../controllers");
const { joiSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(ctrl.login)
);

router.get("/logout", auth, controllerWrapper(ctrl.logout));

module.exports = router;
