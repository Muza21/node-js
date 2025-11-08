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

exports.updateBlog = async (id, title, content) => {
  return await blogModel.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
};

exports.deleteBlog = async (userId, blogId) => {
  const deletedBlog = await blogModel.findByIdAndDelete(blogId);
  if (deletedBlog) {
    await userModel.findByIdAndUpdate(userId, {
      $pull: { blogs: deletedBlog._id },
    });
  }

  return deletedBlog;
};
