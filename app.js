const express = require("express");
const { movies, users } = require("./data/data");
const movieRouter = require("./routes/movie");
const {
  logger,
  blocker,
  customHeader,
} = require("./middlewares/customMiddlewares");
const app = express();
const PORT = 3000;

app.use(express.json()); // allows to use json easily
app.use(express.text()); //server handling text
app.use(express.urlencoded({ extended: true })); // data of url encoded thing

app.use(logger);
app.use(blocker);
app.use(customHeader);

app.use(movieRouter);

//plain text
// app.get("/", (req, res) => {
//   res.send("Hello World from the other side");
// });

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

app.get("/blocked", (req, res) => {
  res.json({
    success: true,
    message: "You will never see this",
  });
});

// route paramter/request paramter with one ID
app.get("/movies/:id", (req, res) => {
  console.log("Route Parameter: ", req.params);
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({
      error: true,
      message: `Movie with id: ${id} is not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: movie,
    message: `Movie Fetched Successfully`,
  });
});

// route parameter/request parameter with many Id
app.get("/users/:userId/movies/:movieId", (req, res) => {
  console.log("Route Parameters: ", req.params);
  const userId = parseInt(req.params.userId);
  const movieId = parseInt(req.params.movieId);
  const user = users.find((user) => user.id === userId);
  const movie = movies.find((movie) => movie.id === movieId);
  if (!user || !movie) {
    return res.status(404).json({
      error: true,
      message: `Movie or user is not found`,
    });
  }
  res.status(200).json({
    success: true,
    data: {
      user: user,
      movie: movie,
    },
    message: `Movie Fetched Successfully`,
  });
});

// query string
app.get("/get-movies", (req, res) => {
  const query = req.query;
  console.log("Query String: ", query);
  const title = query.title;

  const movie = movies.find(
    (movie) => movie.title.toLowerCase() === title.toLowerCase(),
  );
  if (!movie) {
    return res.status(404).json({
      error: true,
      message: `Movie not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: movie,
    message: `Movie Fetched Successfully`,
  });
});

// patch method
app.patch("/update-movie/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie?.id === id);
  const data = req.body;
  if (!data?.title) {
    res.status(400).json({
      error: true,
      message: "Movie Title is required",
    });
  }
  console.log("Data: ", data);
  if (!movie) {
    res.status(404).json({
      error: true,
      message: "Movie Not Found",
    });
  }
  movie.title = data.title;
  res.status(200).json({
    success: true,
    message: "Title Updated Successfully",
    data: movie,
  });
});

//delete method
app.delete("/delete-movie", (req, res) => {
  const data = req.body;
  const { title } = data;
  if (!title) {
    res.status(400).json({
      error: true,
      message: "Title is does not exist",
    });
  }
  const movie = movies.find(
    (movie) => movie?.title.toLowerCase() === title.toLowerCase(),
  );
  if (!movie) {
    res.status(404).json({
      error: true,
      message: "Movie Not Found",
    });
  }
  const updateMovies = movies.filter(
    (movie) => movie?.title.toLowerCase() !== title.toLowerCase(),
  );
  res.status(200).json({
    success: true,
    message: "Movie Deleted Successfully",
    movies: updateMovies,
  });
});

app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
