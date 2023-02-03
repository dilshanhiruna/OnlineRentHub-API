const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false }
});

const User = mongoose.model("user", user);

module.exports = User;
