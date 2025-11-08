const blogModel = require("../models/blog.model");
const userModel = require("../models/user.model");

exports.getBlogs = async () => {
  return await blogModel.find().populate("author", "fullName email");
};

exports.getBlogById = async (id) => {
  return await blogModel.findById(id).populate("author", "fullName email");
};

exports.createBlog = async ({ title, content, author }) => {
  const newBlog = await blogModel.create({ title, content, author });
  await userModel.findByIdAndUpdate(author, {
    $push: { blogs: newBlog._id },
  });
};

exports.updateBlog = async (blogId, userId, title, content) => {
  const blog = await blogModel.findById(blogId);
  if (!blog) {
    return null;
  }
  if (!blog.author.equals(userId)) {
    const error = new Error("unauthorized");
    error.status = 401;
    throw error;
  }
  blog.title = title || blog.title;
  blog.content = content || blog.content;
  await blog.save();
  return blog;
};

exports.deleteBlog = async (userId, blogId) => {
  const blog = await blogModel.findById(blogId);
  if (!blog) {
    return null;
  }
  if (!blog.author.equals(userId)) {
    const error = new Error("unauthorized");
    error.status = 401;
    throw error;
  }
  await blogModel.findByIdAndDelete(blogId);
  await userModel.findByIdAndUpdate(userId, { $pull: { blogs: blogId } });
  return blog;
};
