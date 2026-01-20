const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World from the other side");
});
app.listen(PORT, () => {
  console.log(`The express server is running on ${PORT}`);
});
