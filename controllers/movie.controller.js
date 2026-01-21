const { movies } = require("../data/data");

//JSON Response
// const getAllMovies = (req, res) => {
//   res.json({
//     success: true,
//     message: "Fetched All Movies Succesfully!!!",
//     data: movies,
//     totalLengthOfMovies: movies.length,
//   });
// };

//Json response with status code
const getAllMoviesStatusCode = (req, res) => {
  res.status(201).json({
    success: true,
    data: movies,
    totalLengthOfMovies: movies.length,
  });
};

module.exports = { getAllMoviesStatusCode };
