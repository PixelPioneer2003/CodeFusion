// backend/models/Platform.js
const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["Leetcode", "Codechef", "Codeforces"],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // required: true,
  },
});

const PlatformProfile = mongoose.model("PlatformProfile", platformSchema);

module.exports = PlatformProfile;

// const mongoose = require("mongoose");

// const PlatformProfileSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   platformName: {
//     type: String,
//     required: true,
//   },
//   profileName: {
//     type: String,
//     required: true,
//   },
//   profileUrl: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (v) {
//         return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // URL format validation
//       },
//       message: (props) => `${props.value} is not a valid URL!`,
//     },
//   },
// });

// module.exports = mongoose.model("PlatformProfile", PlatformProfileSchema);
