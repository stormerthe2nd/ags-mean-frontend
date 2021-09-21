var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();

router.get('/:query', async function (req, res) {
  var searchResults = []
  var query = req.params.query.toLowerCase()
  const postsArr = await postModel.find({})
  postsArr.forEach(post => {
    // console.log(post.title.toLowerCase().includes(query))
    post.title.toLowerCase().includes(query) ? searchResults.push(post) : {}
  })

  res.json({ searchResults: searchResults, query: req.params.query });
});

module.exports = router;
