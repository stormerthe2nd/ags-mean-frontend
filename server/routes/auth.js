const router = require("express").Router()
const userModel = require("../model/userModel")

router.get("/", async function (req, res) {
  var email = req.query.email + "@gmail.com"
  if (await userModel.findOne({ email: email })) {
    console.log("user exists")
    return res.json({ admin: false })
  }
  var user = await new userModel({
    email: email,
    role: email !== req.dev ? "client" : "dev",
    createdPosts: [],
    savedPosts: []
  })
  user.save()
  res.json({ admin: false, user: user })
})

module.exports = router