const express = require("express");

const { auth, validation, controllerWrapper } = require("../../middleware");
const { users: ctrl } = require("../../controllers");
const { joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, controllerWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  controllerWrapper(ctrl.updateSubscription)
);

module.exports = router;
