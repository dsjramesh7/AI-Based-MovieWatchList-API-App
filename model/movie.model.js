const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Movie must belong to a user."],
  },
  title: {
    type: String,
    required: [true, "Movie Title is Required"],
    maxLength: [200, "Title cannot exceed 200 characters"],
  },
  year: {
    type: Number,
    required: [true, "Movie Year is Required"],
  },
  movieStatus: {
    type: String,
    enum: {
      values: ["pending", "ongoing", "completed"],
      message: "{VALUE} is not a valid Movie Status",
    },
    default: "pending",
  },
  genre: {
    type: String,
    enum: {
      values: ["Action", "Comedy", "Horror", "Sci-Fi", "Romance", "Other"],
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
