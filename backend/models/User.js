const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }]
});

module.exports = mongoose.model("User", userSchema);
