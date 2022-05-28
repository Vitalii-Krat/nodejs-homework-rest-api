const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.addContacts);

router.put("/:id", ctrl.updateById);

router.delete("/:id", ctrl.removeById);

module.exports = router;
