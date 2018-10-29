// Create the Edge schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: add style field and maybe a source_target field that combines the source
// name and the target name so only one field has to be looked up for searches.
var EdgeSchema = new Schema({
    source_node: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
    target_node: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
    weight: {type: Number}
});

// Virtual for edge's URL
EdgeSchema
.virtual('url')
.get(function () {
    return '/graph/edge/' + this._id;
});

//Export model
module.exports = mongoose.model('Edge', EdgeSchema);
