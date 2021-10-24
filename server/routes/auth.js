const router = require("express").Router()

router.get("/", function (req, res) {
  console.log(req.query.email)
  if (req.users.admins.includes(req.query.email + "@gmail.com")) {
    return res.json({ admin: true })
  }
  res.json({ admin: false })
})

module.exports = router