const RandomFactService = require("../services/randomFact.service");

exports.getRandomFact = async (req, res) => {
  const randomFact = await RandomFactService.getRandomFact();
  res.status(200).json(randomFact);
};
