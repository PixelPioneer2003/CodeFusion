const mongoose = require("mongoose");

const codeforcesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    handle: {
      type: String,
      required: true, // Ensuring handle is unique for each user
    },
    contribution: {
      type: Number,
      required: true,
      default: 0, // Default value is 0
    },
    rating: {
      type: Number,
      required: true,
    },
    friendOfCount: {
      type: Number,
      required: true,
      default: 0, // Default value is 0
    },
    rank: {
      type: String,
      required: true,
    },
    maxRank: {
      type: String,
      required: true,
    },
    maxRating: {
      type: Number,
      required: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Codeforces model based on the schema
const Codeforces = mongoose.model("Codeforces", codeforcesSchema);

module.exports = Codeforces;
