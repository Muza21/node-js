const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  blogs: [{ type: Schema.Types.ObjectId, ref: "blog", defualt: [] }],
});

module.exports = mongoose.model("user", userSchema);
