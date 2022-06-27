const bcrypt = require("bcryptjs");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !user.verify || !passCompare) {
    throw new Unauthorized(`Email or password is wrong, or not veryfy`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: { token },
  });
};

module.exports = login;
