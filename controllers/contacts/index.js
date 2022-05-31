const getAll = require("./getAll");
const getById = require("./getById");
const addContacts = require("./addContacts");
const updateById = require("./updateById");
const updateFavorite = require("./updateFavorite")
const removeById = require("./removeById");

module.exports = {
  getAll,
  getById,
  addContacts,
  updateById,
  removeById,
  updateFavorite,
};
