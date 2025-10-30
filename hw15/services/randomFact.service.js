const { readFile } = require("../utils");

exports.getRandomFact = async () => {
  const randomFacts = await readFile("randomFacts.json", true);
  const index = Math.floor(Math.random() * randomFacts.length);
  return randomFacts[index];
};
