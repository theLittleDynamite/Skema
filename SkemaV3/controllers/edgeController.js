var Edge = require('../models/edge.js');

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
    (req, res, next) => {
        // Create an edge object. TODO: Add style and weight field
        var edge = new Edge({
            source_node: req.body.source_node,
            target_node: req.body.target_node
        });

        // Check if an edge with the same connections already exists.
        Edge.findOne({ 'source_node': req.body.source_node, 'target_node': req.body.target_node })
        .exec( function(err, found_edge) {
            if (err) { return next(err); }

            if (found_edge) {
                // Edge exists.
                // TODO: Give feedback (a warning message box popup)
                // WARNING: An edge with the source and target swapped is still the same edge, but the db won't realise that!!!!!!!!
            }
            else {
                edge.save(function (err) {
                    if (err) { return next(err); }
                    // Edge saved.
                    // TODO: Give feedback

                });
            }
        });
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
