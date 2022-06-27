const express = require("express");

const {
  upload,
  auth,
  validation,
  controllerWrapper,
} = require("../../middleware");
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

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verifyEmail));

module.exports = router;
