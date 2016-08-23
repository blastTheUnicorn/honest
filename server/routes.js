var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var User = mongoose.model('User');



router.post('/signup', function(req, res, next){
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

router.post('/login', function(req, res ,next){
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

module.exports = router;
