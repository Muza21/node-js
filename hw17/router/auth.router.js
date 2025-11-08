const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/isAuth.middleware");
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.delete("/delete", authMiddleware, AuthController.destroy);

module.exports = authRouter;
