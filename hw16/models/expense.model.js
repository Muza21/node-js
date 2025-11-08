const { default: mongoose } = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expense", expenseSchema);
