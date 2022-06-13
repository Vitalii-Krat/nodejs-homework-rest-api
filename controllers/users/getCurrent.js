// eslint-disable-next-line no-unused-vars
const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;
