const router = require("express").Router()
const userModel = require("../model/userModel")
const postModel = require("../model/postModel")

router.get("/", async function (req, res) {
  var email = req.query.email + "@gmail.com"
  var user = await userModel.findOne({ email: email })
  if (user) {
    console.log("user exists")
    return res.json({ user: { email: user.email, role: user.role, savedPosts: user.savedPosts } })
  }
  user = await new userModel({
    email: email,
    role: email !== req.dev ? "client" : "dev",
    createdPosts: [],
    savedPosts: []
  })
  user.save()
  res.json({ user: { email: user.email, role: user.role, savedPosts: user.savedPosts } })
})

// TODO check amt loading below
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

router.post("/savePost", async function (req, res) {
  const { id, email } = req.body
  console.log(id, email)
  await userModel.findOneAndUpdate({ email: email }, { $push: { savedPosts: id } })
  res.json({ msg: "saved" })
})

router.post("/unSavePost", async function (req, res) {
  const { id, email } = req.body
  console.log(id, email)
  await userModel.findOneAndUpdate({ email: email }, { $pull: { savedPosts: id } })
  res.json({ msg: "unsaved" })
})

router.get("/getSavedPosts", async function (req, res) {
  const { email } = req.query
  var user = await userModel.findOne({ email: email })
  postsArr = await postModel.find({ "_id": { $in: user.savedPosts } })
  res.json({ postsArr: postsArr })
})

module.exports = router