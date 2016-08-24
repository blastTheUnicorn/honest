var express = require('express');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./db.js');
var app = express();
var mongoose = require('mongoose');
var User = mongoose.model('User');


var app = express();
var routes = require('./routes');
app.use('/routes', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../app'));



var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/test', function(req, res){
  res.statusCode = 200;
  res.send(new Buffer('Hello World!'));
});



mongoose.connect('mongodb://localhost/honest');
// mongoose.connect('mongodb://');
//this needs to be set up with mlab 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("db connected!");

})

var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port);
});

