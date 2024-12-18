const mongoose = require("mongoose");

const PersonalProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // This field is required to link the profile to a user
    },
    phoneNumber: {
      type: String,
      required: false, // Optional field
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Regex to validate phone number
      default: null, // Default value is null if not provided
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""], // Enum to restrict gender options
      required: false, // Optional field
      default: null, // Default value is null if not provided
    },
    city: {
      type: String,
      required: false, // Optional field
      default: null, // Default value is null if not provided
    },
    state: {
      type: String,
      required: false, // Optional field
      default: null, // Default value is null if not provided
    },
    bio: {
      type: String,
      maxlength: 500, // Limit the length of the bio
      required: false, // Optional field
      default: null, // Default value is null if not provided
    },
    resume: {
      type: String, // Store the file URL or path as a string
      required: false, // Optional field
      default: null, // Default value is null if not provided
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("PersonalProfile", PersonalProfileSchema);
// city tabhi add jab state add kr dia ho
