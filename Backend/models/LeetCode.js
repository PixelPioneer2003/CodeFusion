const mongoose = require("mongoose");

const LeetCodeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    ranking: {
      type: Number,
    },
    reputation: {
      type: Number,
    },
    country: {
      type: String,
    },
    skillTags: {
      type: [String], // Array of skill tags
    },
    about: {
      type: String,
    },
    contestAttend: {
      type: Number, // Number of contests attended
      default: 0,
    },
    contestRating: {
      type: Number, // Contest rating
    },
    contestGlobalRanking: {
      type: Number, // Global ranking in contests
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("LeetCode", LeetCodeSchema);
