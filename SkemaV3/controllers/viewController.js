let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.json();

var View = require('../models/view.js');
var Node = require('../models/node.js');
var Edge = require('../models/edge.js');

var async = require('async');

// Display the site home page
exports.index = function(req, res) {
    res.render('pages/index.ejs');
};

// Display list of all Views.
exports.view_list = function(req, res) {
    View.find({}, 'name')
    .exec(function (err, view_list_results) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('pages/views_list.ejs', { view_list: view_list_results });
    });
};

// Display detail page for a specific View.
exports.view_detail = function(req, res, next) {
    async.parallel({
        // Get all the info about the specific view
        view: function(callback) {
            View.findById(req.params.id)
            .populate('nodes.node')
            .populate({path: 'edges.edge', populate: {path: 'source_node'}})
            .populate({path: 'edges.edge', populate: {path: 'target_node'}})
            .exec(callback);
        },

        // Get a list of every view in the database
        view_list: function(callback) {
            View.find({}, 'name')
            .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.view==null) { // No results.
            var err = new Error('View not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('pages/view.ejs', { view: results.view, view_list: results.view_list } );
    });

};

// Display View create form on GET.
exports.view_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: View create GET');
};

// Handle View create on POST.
exports.view_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: View create POST');
};

// Display View delete form on GET.
exports.view_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: View delete GET');
};

// Handle View delete on POST.
exports.view_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: View delete POST');
};

// Display View update form on GET.
exports.view_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: View update GET');
};

// Handle View update on POST.
exports.view_update_post = [
    // Process request
    async (req, res, next) => {

        try {
            let myNodes = req.body.nodes;
            let myEdges = req.body.edges;

            let node_ids = await getNodes(myNodes);
            let edge_ids = await getEdges(myEdges);

            // Create a View object with updated data and old id.
            var view = new View({
                name: req.body.name,
                nodes: node_ids,
                edges: edge_ids,
                _id: req.params.id //This is required, or a new ID will be assigned
            });

            // Update the record.
            View.findByIdAndUpdate(req.params.id, view, {}, function (err,theView) {
                if (err) {
                    console.log(err.message);
                    res.send(err);
                    return next(err);
                }
                // Successful
                console.log("Successfully updated the view.");
                res.send(theView);
            });
        } catch(err) {
            console.log(err.message);
        }
    }
];

async function getNodes(myNodes) {
    try {
        let node_id;
        let node_ids = [];

        for (myNode of myNodes) {
            //Find the id associated with one node's name
            node_id = await Node.findOne({ 'name': myNode.name }, '_id');
            node_ids.push({
                node: node_id,
                x_pos: myNode.x_pos,
                y_pos: myNode.y_pos
            });
        };

        return node_ids;
    } catch(err) {
        console.log(err.message);
    }
};

async function getEdges(myEdges) {
    try {
        let edge_id;
        let edge_ids = [];

        for (myEdge of myEdges) {
            //Find the id of the source and target nodes
            source_node_id = await Node.findOne({ 'name': myEdge.source_node }, '_id');
            target_node_id = await Node.findOne({ 'name': myEdge.target_node }, '_id');
            //Find the id of the edge with the source_name and target_name combination
            edge_id = await Edge.findOne({ 'source_node': source_node_id, 'target_node': target_node_id }, '_id');
            edge_ids.push({
                edge: edge_id
            });
        };

        return edge_ids;
    } catch(err) {
        console.log(err.message);
    }

};
