const express = require('express');
const app = express();
const sql = require('./sql');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname + '/front_weather_app/build')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const PORT = process.env.PORT || 80;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/front_weather_app/build/index.html'));
});

app.post('/weather', function (req, res) {
  sql.insert(req.body)
    .then(id => res.status(200).send((id).toString()))
    .catch(err => res.send(err))
});

app.delete('/weather', function (req, res) {
  sql.delete(req.body)
    .then(resp => res.status(200).send((resp).toString()))
    .catch(err => res.send(err))
});



app.listen(PORT)
