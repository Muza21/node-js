const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  birthDate: { type: Date, required: true },
  password: {
    type: String,
    required: true,
    select: false,
  },
  blogs: [{ type: Schema.Types.ObjectId, ref: "blog", default: [] }],
});

module.exports = mongoose.model("user", userSchema);
