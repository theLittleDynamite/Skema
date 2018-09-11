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
// The 'network' collection is retrieved from the db so it can be displayed.
// ================================================================
app.get('/', (req, res) => {
    dbo.collection('network').find().toArray((err, results) => {
        if (err) throw err;

        res.render('pages/index.ejs', {network: results});
    });
});

// ================================================================
// Drop the 'network' collection so it can be rebuilt again with the
// local cytoscape network.
// ================================================================
app.delete('/network', (req, res) => {
    dbo.collection('network').drop((err, result) => {
        if (err) throw err;

        console.log("Deleted collection!");
    });
});

// ================================================================
// Convert the single text string from the html form into a JSON array
// and insert this into the 'network' collection as multiple documents.
// ================================================================
app.post('/network', (req, res) => {
    var network_JSON = req.body;

    dbo.collection('network').insertMany(network_JSON, (err, result) => {
            if (err) throw err;

        console.log("Network saved to database!");
    });
});

// ================================================================
// TODO: Update a single document in the 'network' collection rather
// than dropping the entire collection and readding the entire network.
// ================================================================
