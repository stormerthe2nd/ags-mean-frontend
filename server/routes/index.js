var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();

router.get('/', async function (req, res, next) {
  var postsArr = await postModel.find({})
  res.json({ data: postsArr });
});

module.exports = router;
