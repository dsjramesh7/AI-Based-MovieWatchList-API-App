const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // allows to use json easily

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

// trying POST Method here
app.post("/movies", (req, res) => {
  const data = req.body;
  if (!data.title || !data.year) {
    return res.status(400).json({
      error: true,
      message: "Title and Year is required",
    });
  }

  movies.push(data);
  res.status(201).json({
    success: true,
    message: `${data.title} movie is added successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
