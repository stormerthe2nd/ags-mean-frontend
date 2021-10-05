var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();


router.get('/:searchBy/:query', async function (req, res) {
  var searchResults = []
  var query = req.params.query.toLowerCase().trim()
  var searchBy = req.params.searchBy
  var postsArr = []
  if (searchBy === "Description") {
    postsArr = await postModel.find().exec((err, data) => {

    })
    console.log(postsArr)
  }
  res.json({ searchResults: postsArr, query: req.params.query });
});

module.exports = router;
