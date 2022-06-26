const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} is already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email);
  // eslint-disable-next-line no-unused-vars
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarUrl,
      },
    },
  });
};

module.exports = signup;
