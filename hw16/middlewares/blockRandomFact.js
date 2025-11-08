module.exports = (req, res, next) => {
  if (Math.random() < 0.5) {
    return res.status(400).json("request blocked");
  }
  next();
};
