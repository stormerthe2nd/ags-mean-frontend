const mongoose = require("mongoose")

module.exports = mongoose.model("User", mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  createdPosts: { type: Array },
  savedPosts: { type: Array }
}))