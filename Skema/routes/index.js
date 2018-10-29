// This is pretty much skeleton code. Redirects 'root' to '/graph'.

var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res) {
  res.redirect('/graph');
});

module.exports = router;
