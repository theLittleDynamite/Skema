var View = require('../models/view.js');

var async = require('async');

// Display the site home page
exports.index = function(req, res) {
    View.findOne({ name: 'root'})
    .populate('nodes')
    .populate('edges')
    .exec(function (err, results) {
        if (err) { return next(err); }
        res.render('pages/index.ejs', { error: err, data: results });
    });
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
            .populate('edges.edge')
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
exports.view_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: View update POST');
};
