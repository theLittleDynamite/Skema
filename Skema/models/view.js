// Create the View schema - this utilises nested sub schemas which are also created here

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Embedded child node schema
var NodeSubSchema = new Schema({
    // To reduce redundancy, only store the node _id in 'node'
    node: {type: Schema.Types.ObjectId, ref: 'Node'},
    x_pos: {type: Number},
    y_pos: {type: Number}
});

// Embedded child edge schema
var EdgeSubSchema = new Schema({
    // To reduce redundancy, only store the edge _id in 'edge'
    edge: {type: Schema.Types.ObjectId, ref: 'Edge'}
});

// Parent view schema containing arrays of nodes and edges
// Each view must have a unique name for labelling and searching purposes
var ViewSchema = new Schema({
    name: {type: String, max: 20},
    nodes: [NodeSubSchema],
    edges: [EdgeSubSchema]
});

// Virtual for view's URL
ViewSchema
.virtual('url')
.get(function () {
    return '/graph/view/' + this._id;
});

//Export model
module.exports = mongoose.model('View', ViewSchema);
