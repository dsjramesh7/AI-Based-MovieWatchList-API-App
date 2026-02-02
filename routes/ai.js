const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");
const { movieReccomendationAI } = require("../controllers/ai");

//Authorized Routes
router.post("/recommendation", authorization, movieReccomendationAI);

module.exports = router;
