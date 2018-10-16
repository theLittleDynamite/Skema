let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.json();

var User = require('../models/user.js');

// Display detail page for a specific user.
exports.user_profile = function(req, res) {
    res.send('NOT IMPLEMENTED: User profile: ' + req.params.id);
};

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};
