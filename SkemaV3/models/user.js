var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, unique: true, required: true, trim: true},
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true},
    passwordConf: {type: String, required: true}
});

//Export model
module.exports = mongoose.model('User', UserSchema);
