const mongoose = require("mongoose");

const rent = new mongoose.Schema({
  RitemTitle: { type: String, required: true },
  RitemLocation: { type: String, required: true },
  RitemPrice: { type: String, required: true },
  RitemDesc: { type: String, required: true },
  RitemImg: { type: String, required: false },
  username: { type: String, required: true }
});

const Rent = mongoose.model("rent", rent);

module.exports = Rent;
