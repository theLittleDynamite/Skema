let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.json();

var Node = require('../models/node.js');

// Display list of all Nodes.
exports.node_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Node list');
};

// Display detail page for a specific Node.
exports.node_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Node detail: ' + req.params.id);
};

// Display Node create form on GET.
exports.node_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Node create GET');
};

// Handle Node create on POST.
exports.node_create_post = [

    // TODO: validate and sanitize data

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Create a node object. TODO: Add style field
        var node = new Node({
            name: req.body.name
        });

        // Check if a node with the same name already exists.
        Node.findOne({ 'name': req.body.name })
        .exec( function(err, found_node) {
            if (err) { return next(err); }

            if (found_node) {
                // Node exists.
                // TODO: Give feedback (a warning message box popup)
                // WARNING: This means a node isn't saved to db but the user doesn't know that and can keep playing with it locally!!!!!!!!!!!!
                // TODO: Rerender the page so it refreshes with only db stuff so local and db stay in synch when this error occurs.
            }
            else {
                node.save(function (err) {
                    if (err) { return next(err); }
                    // Node saved.
                    // TODO: Give feedback

                });
            }
        });
    }
];

// Display Node delete form on GET.
exports.node_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Node delete GET');
};

// Handle Node delete on POST.
exports.node_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Node delete POST');
};

// Display Node update form on GET.
exports.node_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Node update GET');
};

// Handle Node update on POST.
exports.node_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Node update POST');
};
