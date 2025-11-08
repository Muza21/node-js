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

exports.destroy = async (req, res) => {
  try {
    const deletedUser = await AuthService.deleteUser(req.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "user was not found" });
    }
    return res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
