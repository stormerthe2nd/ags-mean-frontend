var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();

router.get('/', async function (req, res) {
  console.log(req.query)
  var postsArr = []

  var postsArr = await postModel.find({ category: req.query.cat }, null, { limit: 10 })
  res.json({ data: postsArr });
});

module.exports = router;
