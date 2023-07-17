const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { connection } = require("./db");
const { quizRouter } = require("./routes/quiz.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "Hello From Server" });
});

app.use("/user", userRouter);
app.use("/quiz", quizRouter);

app.listen(process.env.port, async () => {
  await connection;
  console.log("Connected to DB");
  console.log(`Server at ${process.env.port}`);
});
