var express = require('express');
const postModel = require('../model/postModel');
var router = express.Router();

router.get('/:searchBy/:query', async function (req, res) {
  var searchResults = []

  var query = req.params.query.toLowerCase().trim()
  const postsArr = await postModel.find({})
  var searchBy = req.params.searchBy
  if (searchBy === "Date") {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = query.split("-")
    var index = Number(date[1] != "10" ? date[1].replace("0", "") : date[1]) - 1
    date[1] = months[index]

  }
  postsArr.forEach(post => {
    if (searchBy == "Title") post.title.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy == "Description") post.des.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy == "Category") post.category.toLowerCase().includes(query) ? searchResults.push(post) : {}
    else if (searchBy == "Date") {
      let updated = post.updated.split("-")
    }
  })
  res.json({ searchResults: searchResults, query: req.params.query });
});

module.exports = router;
