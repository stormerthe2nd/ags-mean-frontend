var express = require('express');
const { post } = require('jquery');
var router = express.Router();
const postModel = require('../model/postModel');


router.get('/:searchBy/:query', async function (req, res) {
  var searchResults = []
  var query = req.params.query.toLowerCase().trim()
  var searchBy = req.params.searchBy
  console.log(query, searchBy)
  postModel.find().exec((err, data) => {
    if (searchBy === "Description") {
      data.forEach(post => { post.des.toLowerCase().includes(query) ? searchResults.push(post) : {} })
    } else if (searchBy === "Title") {
      data.forEach(post => { post.title.toLowerCase().includes(query) ? searchResults.push(post) : {} })
    } else if (searchBy === "Category") {
      data.forEach(post => { post.category.toLowerCase().includes(query) ? searchResults.push(post) : {} })
    } else if (searchBy === "Date") {
      data.forEach(post => { post.updated.toLowerCase().includes(query) ? searchResults.push(post) : {} })
    }
    res.json({ searchResults: searchResults, query: req.params.query });
  })
});

module.exports = router;
