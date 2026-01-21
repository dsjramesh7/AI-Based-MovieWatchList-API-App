const express = require("express");
const router = express.Router();
const { getAllMoviesStatusCode } = require("../controllers/movie.controller");

// router.get("/movies", getAllMovies);
router.get("moviesWithStatusCode", getAllMoviesStatusCode);

module.exports = router;
