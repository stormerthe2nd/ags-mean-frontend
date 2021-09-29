var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();


router.get('/:searchBy/:query', async function (req, res) {
  var searchResults = []
  var query = req.params.query.toLowerCase().trim()
  const postsArr = await postModel.find({})
  var searchBy = req.params.searchBy
  postsArr.forEach(post => {
    if (searchBy == "Title") post.title.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy === "Description") post.des.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy === "Category") post.category.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy === "Date") {
      let updated = post.updated.split("-")
      let date = query.split("-")
      if (date[0] == updated[0] && date[1] == updated[1].toLowerCase() && date[2] == updated[2]) searchResults.push(post)
    }
  })
  res.json({ searchResults: searchResults, query: req.params.query });
});

module.exports = router;
