const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user-routes");

mongoose
  .connect(
    "mongodb+srv://sreenivasulus097:p0ZI9tYDdPMM2Ej9@cluster0.zakmqna.mongodb.net/matrimonydb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
