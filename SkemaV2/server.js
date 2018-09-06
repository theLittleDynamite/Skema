// ================================================================
// Get all the tools and variables we need
// ================================================================
var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://cutlery:Skema1@ds135852.mlab.com:35852/skema';

// ================================================================
// Setup our express application
// ================================================================
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ================================================================
// Start server after we connect to our Mongo database
// ================================================================
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    dbo = client.db('skema');

    // Listen for website requests on localhost
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
});

// ================================================================
// Display the main html page when a browser requests it.
// The 'nodes' collection is retrieved from the db so it can be displayed.
// ================================================================
app.get('/', (req, res) => {
    dbo.collection('nodes').find().toArray((err, results) => {
        if (err) throw err;

        res.render('pages/index.ejs', {nodes: results});
    });
});

// ================================================================
// Insert the html form data into the 'nodes' collection as one document.
// TODO: Make this flexible and better. This is so hard-coded.
// ================================================================
app.post('/nodes', (req, res) => {
    dbo.collection('nodes').insertOne(
        {
            node_name: req.body.node_name,
            x_pos: req.body.x_pos,
            y_pos: req.body.y_pos,
            visible: req.body.visible,
            node_styles: req.body.node_styles,
            edges: [
                {
                    edge_name: req.body.edge_name,
                    target_name: req.body.target_name,
                    thickness: req.body.thickness,
                    edge_styles: req.body.edge_styles
                },
                {
                    edge_name: req.body.edge_name2,
                    target_name: req.body.target_name2,
                    thickness: req.body.thickness2,
                    edge_styles: req.body.edge_styles2
                }
            ]
        },
        (err, result) => {
            if (err) throw err;

        console.log('Saved to database.');
        res.redirect('/');
    });
});

// ================================================================
// Update a document in the 'nodes' collection.
// ================================================================
app.put('/nodes', (req, res) => {
    dbo.collection('nodes').findOneAndUpdate(
        {
            name: 'Probability'
        }, {
            $set: {
                node: req.body.node,
                source: req.body.source
            }
        }, (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        }
    )
});
