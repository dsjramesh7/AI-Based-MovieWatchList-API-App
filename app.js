const express = require("express");
const app = express();
const PORT = 3000;

const movies = [
  {
    title: "One Piece",
    year: 2000,
  },
  {
    title: "AOT",
    year: 2014,
  },
];

//plain text
app.get("/", (req, res) => {
  res.send("Hello World from the other side");
});

//JSON Response
app.get("/movies", (req, res) => {
  res.json({
    success: true,
    data: movies,
    totalLengthOfMovies: movies.length,
  });
});

//Json response with status code
app.get("/moviesWithStatueCode", (req, res) => {
  res.status(201).json({
    success: true,
    data: movies,
    totalLengthOfMovies: movies.length,
  });
});

app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
