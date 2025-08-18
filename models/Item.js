const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
<<<<<<< HEAD
  category: String,
  price: { type: Number, required: true },
  image: String
});
=======
  condition: { type: String, enum: ["new", "used"], default: "used" },
  category: String,
  datePosted: { type: Date, default: Date.now },
  isDonation: { type: Boolean, default: false },
  image: { type: String }, 
});

>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
module.exports = mongoose.model("Item", itemSchema);
