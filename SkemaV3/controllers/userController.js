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

// TODO: The user model file and this user controller file and user.js route to
// implement user accounts and sessions.

// This website describes the process of achieving safe user accounts and sessions.
// https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
// Name of the website in case the URL breaks: "Starting with Authentication (A tutorial with Node.js and MongoDB)"
