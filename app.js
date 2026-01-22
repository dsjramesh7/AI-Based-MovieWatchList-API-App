const express = require("express");
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

app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
