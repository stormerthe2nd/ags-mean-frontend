const mongoose = require("mongoose")

module.exports = mongoose.model("User", mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  createdPostId: { type: Array }
}))