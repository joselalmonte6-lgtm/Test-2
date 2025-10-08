const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  releaseYear: Number,
  genre: String
});

module.exports = mongoose.model("Game", gameSchema);
