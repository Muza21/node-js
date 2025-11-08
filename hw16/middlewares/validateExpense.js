module.exports = (req, res, next) => {
  const { price, category } = req.body;
  if (price == null || isNaN(price)) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid price field" });
  }
  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid category field" });
  }
  next();
};
