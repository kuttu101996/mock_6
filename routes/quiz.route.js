const express = require("express");
const { QuizModel } = require("../models/quiz.model");

const quizRouter = express.Router();

quizRouter.get("/", async (req, res) => {
  try {
    const data = await QuizModel.find();
    res.send({ msg: "All Quizes", data });
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

quizRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const newQuiz = new QuizModel(payload);
    await newQuiz.save();
    res.send(newQuiz);
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

quizRouter.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const deleting = await QuizModel.findByIdAndDelete({ _id });
    res.send({ msg: "Successfully Deleted", deleting });
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

quizRouter.patch("/edit/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const updated = await QuizModel.findByIdAndUpdate(_id, data);
    res.send({ msg: "SuccessFully edited", updated });
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

quizRouter.get("/play/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const quiz = await QuizModel.findById({ _id });
    res.send({
      msg: "All questions stored in form of an Array",
      questions: quiz.quiz.questions,
    });
  } catch (error) {
    res.send({ msg: "Catch Block" });
  }
});

quizRouter.post("/leaderboard/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    const userID = req.body.userID;

    const quiz = await QuizModel.findById({ _id });
    quiz.leaderboard.push(payload);
    const updatedLeaderboard = await quiz.save();

    res.send({ msg: "Catch Block", updatedLeaderboard });
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

quizRouter.get("/leaderboard/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const findingLeaderboard = await QuizModel.findById({ _id });
    res.send({ msg: "All Leaderboard Data", findingLeaderboard });
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

module.exports = {
  quizRouter,
};
