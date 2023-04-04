const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user-routes");
require("dotenv").config();

mongoose
  .connect(process.env.mongodb_connect_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000))
  .then(() => {
    console.log(
      "connected to mongodb database and listening to localhost 5000"
    );
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
