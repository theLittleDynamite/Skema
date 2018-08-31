var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://cutlery:Skema1@ds135852.mlab.com:35852/skema';

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    dbo = client.db('skema');

    // Listen for website requests on localhost
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
});

app.get('/', (req, res) => {
    dbo.collection('nodes').find().toArray((err, results) => {
        if (err) throw err;

        res.render('index.ejs', {nodes: results});
    });
});

app.post('/nodes', (req, res) => {
    dbo.collection('nodes').insertOne(req.body, (err, result) => {
        if (err) throw err;

        console.log('Saved to database.');
        res.redirect('/');
    });
});
