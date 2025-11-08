const AuthService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    await AuthService.register(req.body);
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    return res.json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
