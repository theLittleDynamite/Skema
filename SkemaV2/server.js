const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://Darian:Skema1@ds135852.mlab.com:35852/skema', (err, database) => {
  // ... start the server
})

app.listen(3000, () => {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})
