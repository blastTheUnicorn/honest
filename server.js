var express = require('express');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('./db.js');
var app = express();
var User = mongoose.model('User');


var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/test', function(req, res){
  res.statusCode = 200;
  res.send(new Buffer('Hello World!'));
});

app.use(express.static(__dirname + '/app'));

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
  // //started the passport instructions for FB. Not sure about the callbackURL property. I think we put our localhost in
  // //there along with the process.env.PORT
  // //also not sure about the anonymous callback 

  // //not sure if the client ID and client secret are supposed to be strings
  // passport.use(new FacebookStrategy({
  //     clientID: process.env.FACEBOOK_ID,
  //     clientSecret: process.env.FACEBOOK_SECRET,
  //     callbackURL:"localhost:3000/auth/facebook/callback"
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     User.findOrCreate(..., function(err, user) {
  //       if (err) { return done(err); }
  //       done(null, user);
  //     });
  //   }
  // ));

  // //this routes user to facebook to login
  // app.get('/auth/facebook', passport.authenticate('facebook'));

  // //this routes user back to the app after the login is accepted
  // app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

})

var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port);
});

module.exports = server;
