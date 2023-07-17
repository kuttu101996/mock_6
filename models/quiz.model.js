const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  quiz: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    creator: String,
    title: String,
    description: String,
    questions: [
      {
        title: String,
        answerOptions: [String],
        correctOptions: [Number],
      },
    ],
  },
  leaderboard: [
    {
      email: String,
      score: Number,
    },
    {
      email: String,
      score: Number,
    },
    {
      email: String,
      score: Number,
    },
  ],
});

const QuizModel = mongoose.model("Quiz", quizSchema);

module.exports = {
  QuizModel,
};
