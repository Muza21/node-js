const { Router } = require("express");
const RandomFactController = require("../controllers/randomFact.controller");
const blockRandomFact = require("../middlewares/blockRandomFact");

const randomFactRouter = Router();

randomFactRouter.get("/", blockRandomFact, RandomFactController.getRandomFact);

module.exports = randomFactRouter;
