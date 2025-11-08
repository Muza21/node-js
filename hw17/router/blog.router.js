const { Router } = require("express");
const BlogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/isAuth.middleware");
const validateMiddelware = require("../middlewares/validate.middleware");
const {
  createBlogSchema,
  updateBlogSchema,
} = require("../validations/blog.validation");
const blogRouter = Router();

blogRouter.get("/", BlogController.index);
blogRouter.get("/:id", BlogController.show);
blogRouter.post(
  "/",
  authMiddleware,
  validateMiddelware(createBlogSchema),
  BlogController.store
);
blogRouter.patch(
  "/:id",
  authMiddleware,
  validateMiddelware(updateBlogSchema),
  BlogController.update
);
blogRouter.delete("/:id", authMiddleware, BlogController.destroy);

module.exports = blogRouter;
