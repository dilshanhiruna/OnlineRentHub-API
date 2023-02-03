const mongoose = require("mongoose");

const item = new mongoose.Schema({
  itemTitle: { type: String, required: true },
  itemLocation: { type: String, required: true },
  itemPrice: { type: String, required: true },
  itemDesc: { type: String, required: true },
  itemImg: { type: String, required: false }
});

const Item = mongoose.model("item", item);

module.exports = Item;
