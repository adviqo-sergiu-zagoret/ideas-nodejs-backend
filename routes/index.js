var database = require("../database/database");

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  database.updateUser("User11");
  res.render('index', { title: 'Express' });
});

module.exports = router;
