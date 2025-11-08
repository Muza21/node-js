const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async ({ name, email, password }) => {
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Error("user already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
};

exports.login = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("password");
  if (!user) {
    throw new Error("email or password is incorrect");
  }

  const isPassEqual = await bcrypt.compare(password, user.password);
  if (!isPassEqual) {
    throw new Error("email or password is incorrect");
  }

  const payload = { userId: user._id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return token;
};
