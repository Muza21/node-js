const { Router } = require("express");
const BlogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/isAuth.middleware");
const blogRouter = Router();

blogRouter.get("/", BlogController.index);
blogRouter.get("/:id", BlogController.show);
blogRouter.post("/", authMiddleware, BlogController.store);
blogRouter.patch("/:id", authMiddleware, BlogController.update);
blogRouter.delete("/:id", authMiddleware, BlogController.destroy);

module.exports = blogRouter;
