const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  condition: { type: String, enum: ["new", "used"], default: "used" },
  category: String,
  datePosted: { type: Date, default: Date.now },
  isDonation: { type: Boolean, default: false },
  image: { type: String }, 
});

module.exports = mongoose.model("Item", itemSchema);
