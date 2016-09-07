var express = require('express');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var app = express();
var database = require('./db.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectModel = mongoose.model('ObjectModel');

var sendgrid  = require('sendgrid')(process.env.SENDGRID_USER, process.env.SENDGRID_PASSWORD);
 

 mongoose.connect('mongodb://localhost/honest');
// mongoose.connect('mongodb://honest:ornitorrinco@ds017246.mlab.com:17246/heroku_qmsldprb');
//this needs to be set up with mlab 


var db = mongoose.connection;


  // User.find({}, function(err, users) {
  //   var userMap = {};

  //   users.forEach(function(user) {
  //     userMap[user._id] = user;
  //   });

  //   res.send(userMap);  
  // });


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("db connected!");
});

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


app.param('user', function(req, res, next, id){
  var query = User.findById(id);

  query.exec(function(err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('Can\'t find user')); }

    req.user = user;
    return next();
  });
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


app.post('/api/user/:user', function(req, res, next){
  var object = new ObjectModel();
  object._user = req.user._id
  object.lostOrFound = req.body.lostOrFound;
  object.geo = req.body.position;
  object.category = req.body.type;
  object.keyWords = req.body.colors;
  object.comments = req.body.description;
  object.point = {"point":"2dsphere"}
  object.save(function(err, obj){
    if(err){return next(err)}
    if(req.body.lostOrFound === 'lost'){
    req.user.local.lost.push(obj)
    }else{
    req.user.local.found.push(obj)
    }
    req.user.save(function(err, obj){
    if(err){return next(err)}
    })
  })

   ObjectModel.find({geo: { $nearSphere: object.geo, $maxDistance: 1} }, function(err, docs){
    if (!err){
      var element = docs.filter(function(element){
        if (element.lostOrFound === 'found' && object.lostOrFound === 'lost') {
          return element
        }
        else if (object.lostOrFound === 'found' && element.lostOrFound === 'lost') {
          return element
        }
      });
      } else {throw err;}
       res.json(element)
  })
});



app.get('/api/user/:user/obj', function(req, res){
  User
  .findOne(req.user._id)
  .populate('local.lost')
  .populate('local.found')
  .exec(function(err, obj){
    res.json(obj)
  })

});

app.get('/api/obj/:obj', function(req, res){
  ObjectModel
    .findOne({_id : req.params.obj})
    .remove()
    .exec(function(err, obj){
      res.json(obj)
     })
});


var helper = require('sendgrid').mail

app.post('/api/:user/send', function (req, res) {
  // console.log('user',req.user)
  console.log("body", req.body);
  // from_email = new helper.Email("noreply@honest-app.com")
  // to_email = new helper.Email(req.user.local.email)
  // subject = "A MATCH!"
  // content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
  // mail = new helper.Mail(from_email, subject, to_email, content)

  // var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  // var request = sg.emptyRequest({
  //   method: 'POST',
  //   path: '/v3/mail/send',
  //   body: mail.toJSON()
  // });

  // sg.API(request, function(error, response) {
  //   console.log(response.statusCode)
  //   console.log(response.body)
  //   console.log(response.headers)
  // })
});

app.get('/api/:user', function(req, res){
    var response = {
      name : req.user.local.name,
      email : req.user.local.email,
      username : req.user.local.username
    }
    res.json(response)
})


var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port);
});
