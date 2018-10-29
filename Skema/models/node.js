var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
    name: {type: String, required: true, max: 20, index: true, unique: true},
    style: {type: String}
});

// Virtual for node's URL
NodeSchema
.virtual('url')
.get(function () {
    return '/graph/node/' + this._id;
});

//Export model
module.exports = mongoose.model('Node', NodeSchema);
