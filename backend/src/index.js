const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4000;
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongoDB connection ON");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  throw new Error("it is an error");
  //res.send("Hello, world!");
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다.");
});

app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(port, () => {
  console.log(`running on ${port} port`);
});
