var Node = require('../models/node.js');
var Edge = require('../models/edge.js');

var async = require('async');

// Display list of all Edges.
exports.edge_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge list');
};

// Display detail page for a specific Edge.
exports.edge_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge detail: ' + req.params.id);
};

// Display Edge create form on GET.
exports.edge_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge create GET');
};

// Handle Edge create on POST.
exports.edge_create_post = [

    // TODO: validate and sanitize data

    // Process request after validation and sanitization.
    async (req, res, next) => {

        try {
            source_node_id = await Node.findOne({ 'name': req.body.source_node_name }, '_id');
            target_node_id = await Node.findOne({ 'name': req.body.target_node_name }, '_id');

            console.log("Source node");
            console.log(req.body.source_node_name);
            console.log(source_node_id);
            console.log("Target node");
            console.log(req.body.target_node_name);
            console.log(target_node_id);

            // Create an edge object. TODO: Add style and weight field
            var edge = new Edge({
                source_node: source_node_id,
                target_node: target_node_id
            });

            console.log("edge");
            console.log(edge);

            // Check if an edge with the same connections already exists.
            Edge.findOne({ 'source_node': source_node_id, 'target_node': target_node_id })
            .exec( function(err, found_edge) {
                if (err) { return next(err); }

                if (found_edge) {
                    // Edge exists.
                    // TODO: Give feedback (a warning message box popup)
                    // WARNING: An edge with the source and target swapped is still the same edge, but the db won't realise that!!!!!!!!
                    console.log("Edge already exists in database. A new edge has NOT been created.");
                }
                else {
                    edge.save(function (err) {
                        if (err) { return next(err); }
                        // Edge saved.
                        // TODO: Give feedback
                        console.log("Successfully created a new edge.");
                    });
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    }
];

// Display Edge delete form on GET.
exports.edge_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge delete GET');
};

// Handle Edge delete on POST.
exports.edge_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge delete POST');
};

// Display Edge update form on GET.
exports.edge_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge update GET');
};

// Handle Edge update on POST.
exports.edge_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Edge update POST');
};
