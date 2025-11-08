const userModel = require("../models/user.model");
const blogModel = require("../models/blog.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async ({ fullName, email, password, birthDate }) => {
  const user = await userModel.findOne({ email });
  if (user) {
    throw new Error("user already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({
    fullName,
    email,
    password: hashedPassword,
    birthDate,
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

exports.deleteUser = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) return null;

  await blogModel.deleteMany({ author: user._id });

  await userModel.findByIdAndDelete(userId);

  return user;
};
