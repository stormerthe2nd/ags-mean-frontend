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

router.get("/users/:amt", async function (req, res) {
  var amt = +req.params.amt
  var users = await userModel.find({}).skip(amt, amt + 30)
  res.json({ users: users })
})

router.get("/update", async function (req, res) {
  const { email, role } = req.query
  await userModel.findOneAndUpdate({ email: email }, { role: role })
  res.json({ email: email, role: role })
})

module.exports = router