require("dotenv").config();
const express = require("express");
const movieRouter = require("./routes/movie");
const {
  logger,
  blocker,
  customHeader,
} = require("./middlewares/customMiddlewares");
const app = express();
const connectDB = require("./database/database");
const notFound = require("./middlewares/notFound");
const PORT = 3000;

app.use(express.json()); // allows to use json easily
app.use(express.text()); //server handling text
app.use(express.urlencoded({ extended: true })); // data of url encoded thing

app.use(logger);
app.use(blocker);
app.use(customHeader);

app.use(movieRouter);

app.use(notFound); // top to bottom approach that's why we put it at last

//plain text
// app.get("/", (req, res) => {
//   res.send("Hello World from the other side");
// });

app.listen(PORT, async () => {
  try {
    console.log("the database connection started...");
    await connectDB(process.env.MONGODB_URI);
    console.log("the mongodb database is connected");
  } catch (error) {
    console.log("An error occured..");
    console.log("Error => ", error?.message);
  }
  console.log(`The express server is running on ${PORT}`);
});
