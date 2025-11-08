const { default: mongoose, Schema } = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("blog", blogSchema);
