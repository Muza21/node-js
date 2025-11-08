module.exports = (req, res, next) => {
  const secret = req.headers["secret"];
  if (secret !== "secret-token") {
    return res.status(403).json({ error: true, message: "Access denied" });
  }
  next();
};
