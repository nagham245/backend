const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  price: { type: Number, required: true },
  image: String
});
module.exports = mongoose.model("Item", itemSchema);
