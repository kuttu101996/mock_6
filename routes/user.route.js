const express = require("express");
const { UserModle } = require("../models/user.model");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    console.log("Hello");
    res.send("Hello");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

userRouter.post("/check", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    const checking = await UserModle.find({ email: payload.email });
    if (checking.length > 0) {
      return res.send({ msg: "Existing User", payload });
    } else {
      const newUser = new UserModle(payload);
      await newUser.save();
      return res.send({ msg: "User Created", newUser });
    }
  } catch (error) {
    res.send({ msg: "Catch Block", error });
  }
});

module.exports = {
  userRouter,
};
