const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Movie Title is Required"],
    maxLength: [200, "Title cannot exceed 200 characters"],
  },
  year: {
    type: Number,
    required: [true, "Movie Year is Required"],
  },
  genre: {
    type: String,
    enum: {
      values: ["Action", "Comedy", "Horror", "Sci-Fi", "Other"],
      message: "{VALUE} is not a valid genre",
    },
  },
  rating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [10, "Rating should not exceed 10"],
  },
});

module.exports = mongoose.model("Movies", movieSchema);
