var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: add style field
var EdgeSchema = new Schema({
    source_node: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
    target_node: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
    weight: {type: Number}
});

// Virtual for author's URL
EdgeSchema
.virtual('url')
.get(function () {
    return '/graph/edge/' + this._id;
});

//Export model
module.exports = mongoose.model('Edge', EdgeSchema);
