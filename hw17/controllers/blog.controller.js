const BlogService = require("../services/blog.service");

exports.index = async (req, res) => {
  try {
    const blogs = await BlogService.getBlogs();
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.show = async (req, res) => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog was not found" });
    }
    return res.status(200).json(blog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.store = async (req, res) => {
  try {
    const blogData = { ...req.body, author: req.userId };
    await BlogService.createBlog(blogData);
    return res.status(201).json("created succesfully");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await BlogService.updateBlog(
      req.params.id,
      req.userId,
      title,
      content
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "blog was not found" });
    }
    return res.status(201).json("updated succesfully");
  } catch (err) {
    return res.status(err.status || 400).json({ message: err.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const deleted = await BlogService.deleteBlog(req.userId, req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(err.status || 400).json({ message: err.message });
  }
};
