const mongoose = require("mongoose")
var d = new Date()
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

module.exports = mongoose.model("Post", mongoose.Schema({
  sno: Number,
  imgPath: Array,
  des: String,
  updated: {
    type: String, default: `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`
  },
  active: { type: Boolean, default: true },
  category: { type: String, default: "Other" },
}))