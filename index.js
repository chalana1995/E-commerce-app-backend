const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connect Successfully");
  })
  .catch((err) => console.log(err));

app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server Running");
});
