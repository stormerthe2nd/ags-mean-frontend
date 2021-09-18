var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();

router.get('/:query', async function (req, res) {
  // var post = await postModel.findById(req.params.query)
  res.json({ result: req.params.query });
});

module.exports = router;
