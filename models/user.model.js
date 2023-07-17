const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModle = mongoose.model("user", userSchema);

module.exports = {
  UserModle,
};
