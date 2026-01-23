const express = require("express");
const router = express.Router();
// const {
//   getAllMoviesStatusCode,
//   postMovie,
//   blocked,
//   getByIdMovie,
//   getByIdBothUserandMovie,
//   getByQueryStringMethodMovie,
//   updateCertainThingMovie,
//   deleteMovie,
// } = require("../controllers/movie.controller");

// router.get("/movies", getAllMovies);
// router.get("/moviesWithStatusCode", getAllMoviesStatusCode);
// router.post("/movies", postMovie);
// router.get("/blocked", blocked);
// router.get("/movies/:id", getByIdMovie);
// router.get("/users/:userId/movies/:movieId", getByIdBothUserandMovie);
// router.get("/get-movies", getByQueryStringMethodMovie);
// router.patch("/update-movie/:id", updateCertainThingMovie);
// router.delete("/delete-movie", deleteMovie);

// real implementation
const createMovie = require("../controllers/movie.controller");

router.post("/create-movie", createMovie);

module.exports = router;
