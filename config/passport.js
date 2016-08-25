var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){

  passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, username, password, done){
    User.findOne({'local.username' : username}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {message : 'Incorrect username'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message : 'Incorrect password'})
      }
      return done(null, user)
    })
  }));
}
