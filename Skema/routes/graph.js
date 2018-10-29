// Currently stores all the routes in the project. Any URL requesting one of these
// resources will be redirected to the relevant controller function.

var express = require('express');
var router = express.Router();

// Require controller modules.
var node_controller = require('../controllers/nodeController');
var edge_controller = require('../controllers/edgeController');
var view_controller = require('../controllers/viewController');

// GET Skema home page.
router.get('/', view_controller.index);

/// NODE ROUTES ///

// GET request for creating a Node. NOTE This must come before routes that display Node (uses id).
router.get('/node/create', node_controller.node_create_get);

// POST request for creating Node.
router.post('/node/create', node_controller.node_create_post);

// GET request to delete Node.
router.get('/node/:id/delete', node_controller.node_delete_get);

// POST request to delete Node.
router.post('/node/delete', node_controller.node_delete_post);

// GET request to update Node.
router.get('/node/:id/update', node_controller.node_update_get);

// POST request to update Node.
router.post('/node/update', node_controller.node_update_post);

// GET request for one Node.
router.get('/node/:id', node_controller.node_detail);

// GET request for list of all Node items.
router.get('/nodes', node_controller.node_list);

/// EDGE ROUTES ///

// GET request for creating Edge. NOTE This must come before route for id (i.e. display edge).
router.get('/edge/create', edge_controller.edge_create_get);

// POST request for creating Edge.
router.post('/edge/create', edge_controller.edge_create_post);

// GET request to delete Edge.
router.get('/edge/:id/delete', edge_controller.edge_delete_get);

// POST request to delete Edge.
router.post('/edge/delete', edge_controller.edge_delete_post);

// GET request to update Edge.
router.get('/edge/:id/update', edge_controller.edge_update_get);

// POST request to update Edge.
router.post('/edge/:id/update', edge_controller.edge_update_post);

// GET request for one Edge.
router.get('/edge/:id', edge_controller.edge_detail);

// GET request for list of all Edges.
router.get('/edges', edge_controller.edge_list);

/// VIEW ROUTES ///

// GET request for creating a View. NOTE This must come before route that displays View (uses id).
router.get('/view/create', view_controller.view_create_get);

//POST request for creating View.
router.post('/view/create', view_controller.view_create_post);

// GET request to delete View.
router.get('/view/:id/delete', view_controller.view_delete_get);

// POST request to delete View.
router.post('/view/:id/delete', view_controller.view_delete_post);

// GET request to update View.
router.get('/view/:id/update', view_controller.view_update_get);

// POST request to update View.
router.post('/view/:id/update', view_controller.view_update_post);

// GET request for one View.
router.get('/view/:id', view_controller.view_detail);

// GET request for list of all View.
router.get('/views', view_controller.view_list);


module.exports = router;
