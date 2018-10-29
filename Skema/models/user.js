// In the future this will create the User schema

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, unique: true, required: true, trim: true},
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true},
    passwordConf: {type: String, required: true}
});

// TODO: This user model file and user controller file and users.js route to implement
// user accounts and sessions.

// This website describes the process of achieving safe user accounts and sessions.
// https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
// Name of the website in case the URL breaks: "Starting with Authentication (A tutorial with Node.js and MongoDB)"

//Export model
module.exports = mongoose.model('User', UserSchema);
