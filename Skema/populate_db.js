// This file populates an empty database for testing purposes

var async = require('async');
var View = require('./models/view.js');
var Node = require('./models/node.js');
var Edge = require('./models/edge.js');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://cutlery:Skema1@ds135852.mlab.com:35852/skema';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var nodes = []
var edges = []
var views = []

// Functions to add documents to each collection
function nodeCreate(name, style, cb) {
    nodedetail = { name:name }
    if (style != false) nodedetail.style = style

    var node = new Node(nodedetail);

    node.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Node: ' + node);
        nodes.push(node)
        cb(null, node)
      });
}

function edgeCreate(source_node, target_node, weight, cb) {
    edgedetail = {
        source_node:source_node,
        target_node:target_node
    }
    if (weight != false) {
        edgedetail.weight = weight;
    }

    var edge = new Edge(edgedetail);

    edge.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Edge: ' + edge);
        edges.push(edge)
        cb(null, edge)
      });
}

function viewCreate(view_name, node_ids, x_positions, y_positions, edge_ids, cb) {
    viewdetail = {
        name: view_name,
        nodes: [],
        edges: []
    };

    // Add each parameter (e.g. node_ids[0]) to the relevant subdocument within
    // the viewdetail variable (e.g. nodes.node)
    for (i in node_ids) {
        viewdetail.nodes.push({
            node: node_ids[i],
            x_pos: x_positions[i],
            y_pos: y_positions[i]
        });
    }

    for (i in edge_ids) {
        viewdetail.edges.push({
            edge: edge_ids[i]
        });
    }

    var view = new View(viewdetail);

    view.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New View: ' + view);
        views.push(view)
        cb(null, view)
      });
}

// Call the functions with actual values
function createNodes(cb) {
    async.parallel([
        function(callback) {
          nodeCreate('Addition', false, callback);
        },
        function(callback) {
          nodeCreate('Multiplication', false, callback);
        },
        function(callback) {
          nodeCreate('Area', false, callback);
        },
        function(callback) {
          nodeCreate('Perimeter', false, callback);
        },
        function(callback) {
          nodeCreate('Symmetry', false, callback);
        },
        ],
        cb);
}

function createEdges(cb) {
    async.parallel([
        function(callback) {
          edgeCreate(nodes[0], nodes[1], false, callback);
        },
        function(callback) {
          edgeCreate(nodes[2], nodes[3], false, callback);
        },
        ],
        cb);
}

// Make the nodes and edges array for the views
//var view1_nodes = [nodes[0]._id, nodes[1]._id];
var view1_name = 'Basic Operations';
var view1_xpos = [200, 600];
var view1_ypos = [100, 500];
//var view1_edges = [edges[0]._id];
//var view2_nodes = [nodes[2]._id, nodes[3]._id];
var view2_name = 'Shapes';
var view2_xpos = [700, 300];
var view2_ypos = [500, 250];
//var view2_edges = [edges[1]._id];

function createViews(cb) {
    async.parallel([
        function(callback) {
          viewCreate(view1_name, [nodes[0]._id, nodes[1]._id], view1_xpos, view1_ypos, [edges[0]._id], callback);
        },
        function(callback) {
          viewCreate(view2_name, [nodes[2]._id, nodes[3]._id], view2_xpos, view2_ypos, [edges[1]._id], callback);
        },
        ],
        cb);
}

async.series([
    createNodes,
    createEdges,
    createViews
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done! All documents saved.');

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
