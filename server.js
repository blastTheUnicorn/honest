var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./db.js');


console.log(module.exports)
var User = mongoose.model('User');
var app = express();


var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/test', function(req, res){
  res.statusCode = 200;
  res.send(new Buffer('Hello World!'));
});

app.use(express.static(__dirname + '/app'));

mongoose.connect('mongodb://localhost/honest');
// mongoose.connect('mongodb://ksiddana:itsmeagain@ds049925.mongolab.com:49925/hyrax');
//this needs to be changed before deployment 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("db connected!");

})

app.post('/signup', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.name || !req.body.email){
    return res.status(400).json({message: 'Please fill out all fields'});
 };
 var user = new User();
 user.username = req.body.username;
 //add hashPasword to the user schema 
 user.hashPasword(req.body.password);
 user.save(function(err){
  if(err){return next(err);}
  //add generateJWT to the user schema
  res.json({token: user.generateJWT()})
 })
});

app.post('/login', function(req, res ,next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  // set up passport file
  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}

    if(user){
      // add generateJWT to user schema
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port);
});

module.exports = server;
