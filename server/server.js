var express = require('express');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var db = require('./db.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');


mongoose.connect('mongodb://localhost/honest');
// mongoose.connect('mongodb://');
//this needs to be set up with mlab 

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("db connected!");

})

var app = express();
var routes = require('./routes.js');
app.use('/routes', routes);
require('../config/passport')(passport);


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../app'));


var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/test', function(req, res){
  res.statusCode = 200;
  res.send(new Buffer('Hello World!'));
});

app.post('/api/login', function(req, res, next){
if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

app.post('/api/signUp', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.name || !req.body.email){
    return res.status(400).json({message: 'Please fill out all fields'});
 };
 var user = new User();
 user.local.name = req.body.name;
 user.local.email = req.body.email;
 user.local.username = req.body.username;
 user.local.password = user.generateHash(req.body.password);
 user.save(function(err){
  if(err){return next(err);}
  res.json({token: user.generateJWT()})
 })
});

var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port);
});

