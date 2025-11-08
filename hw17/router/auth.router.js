const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/isAuth.middleware");
const validateMiddelware = require("../middlewares/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");
const authRouter = Router();

authRouter.post(
  "/register",
  validateMiddelware(registerSchema),
  AuthController.register
);
authRouter.post(
  "/login",
  validateMiddelware(loginSchema),
  AuthController.login
);
authRouter.delete("/delete", authMiddleware, AuthController.destroy);

module.exports = authRouter;
