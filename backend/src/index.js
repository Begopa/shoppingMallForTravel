const express = require("express");
const path = require("path");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`running on ${port} port`);
});
