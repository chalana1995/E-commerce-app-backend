const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connect Successfully");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Backend Server Running");
});
