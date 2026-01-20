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

app.use(express.json()); // allows to use json easily
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("logger....");
  console.log("reques method", req.method);
  console.log("reques URL", req.url);
  next();
});

//block middleware why because we want to stop the execution so we are not using next() here in the if scope
app.use((req, res, next) => {
  if (req.url === "/blocked") {
    console.log("Request is blocked");
    res.status(403).json({
      success: false,
      message: "The route is blocked by a middleware",
    });
  }
  // next();
});

app.use((req, res, next) => {
  console.log("Adding custom Header");
  res.setHeader("X-PoweredBy", "Express");
  next();
});

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

app.get("/blocked", (req, res) => {
  res.json({
    success: true,
    message: "You will never see this",
  });
});

app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
