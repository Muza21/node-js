const fs = require("fs/promises");
const mongoose = require("mongoose");

async function readFile(filePath, isParsed) {
  if (!filePath) return;
  const data = await fs.readFile(filePath, "utf-8");
  return isParsed ? JSON.parse(data) : data;
}

async function writeFile(filePath, data) {
  if (!filePath || !data) return;
  await fs.writeFile(
    filePath,
    typeof data === "string" ? data : JSON.stringify(data)
  );
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = { readFile, writeFile, validateId };
