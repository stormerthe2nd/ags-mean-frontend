const router = require("express").Router()
const userModel = require("../model/userModel")

router.get("/", async function (req, res) {
  var email = req.query.email + "@gmail.com"
  var user = await userModel.findOne({ email: email })
  if (user) {
    console.log("user exists")
    return res.json({ user: { email: user.email, role: user.role } })
  }
  user = await new userModel({
    email: email,
    role: email !== req.dev ? "client" : "dev",
    createdPosts: [],
    savedPosts: []
  })
  user.save()
  res.json({ user: { email: user.email, role: user.role } })
})

module.exports = router