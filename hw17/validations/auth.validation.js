const Joi = require("joi");

exports.registerSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).required(),
  birthDate: Joi.date().required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
