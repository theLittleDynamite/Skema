// Implements CRUD operations on the Node collection

let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.json();

var Node = require('../models/node.js');

var async = require('async');

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
    // Process request
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
                // WARNING: This means a node isn't saved to db but the user doesn't know that and can keep playing with it locally.
                let error_msg = "Node already exists in database. A new node has NOT been created.";
                res.send(found_node);
                console.log(error_msg);
            }
            else {
                node.save(function (err) {
                    if (err) {
                        console.log(err.message);
                        res.send(err);
                        return next(err);
                    }
                    // Node saved.
                    res.send(node);
                    console.log("Successfully created new node.");
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
exports.node_delete_post = [
    // Process request
    async (req, res, next) => {
        try {
            let node_name = req.body.name;

            // Delete the node.
            Node.findOneAndDelete({name: node_name}, function (err, node) {
                if (err) {
                    console.log(err.message);
                    res.send(err);
                    return next(err);
                }
                if (node == null) {
                    console.log("Node was not found and was not deleted.");
                    res.send(node);
                } else {
                    // Successful
                    // TODO: Give feedback
                    console.log("Successfully deleted node.");
                    console.log("Node was:");
                    console.log(node);
                    res.send(node);
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    }
];

// Display Node update form on GET.
exports.node_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Node update GET');
};

// Handle Node update on POST.
exports.node_update_post = [
    // TODO: Validate and sanitize text

    // Process request
    async (req, res, next) => {
        try {
            node_exists = await Node.findOne({ 'name': req.body.new_name});

            if (node_exists) {
                console.log("A node with that name already exists. Now using that node in the database.");
            }
            else {
                let node_id = await Node.findOne({ 'name': req.body.old_name }, '_id');

                // Create a Node object with updated data and old id.
                var node = new Node({
                    name: req.body.new_name,
                    _id: node_id //This is required, or a new ID will be assigned
                });

                // Update the record.
                Node.findByIdAndUpdate(node_id, node, {}, function (err,theNode) {
                    if (err) {
                        console.log(err.message);
                        res.send(err);
                        return next(err);
                    }
                    if (!theNode) {
                        console.log("Node was not found and was not updated.");
                        res.send(theNode);
                    } else {
                        // Successful
                        console.log("Successfully updated node name.");
                        res.send(theNode);
                    }
                });
            }
        } catch(err) {
            console.log(err.message);
        }
    }
];
