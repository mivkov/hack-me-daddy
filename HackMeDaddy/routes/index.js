var express = require('express');
var router = express.Router();

var request = require("request");
var showdown = require('showdown');
var converter = new showdown.Converter();
var htmlParsed;

request(
  { uri: "https://raw.githubusercontent.com/mivkov/hack-me-daddy/master/README.md"},
  function(error, response, body){
    console.log(body);
    htmlParsed = converter.makeHtml(body);
  }
)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { parseMe: htmlParsed });
});



module.exports = router;
