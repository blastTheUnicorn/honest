var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/honest');
// mongoose.connect('mongodb://ksiddana:itsmeagain@ds049925.mongolab.com:49925/hyrax');
//this needs to be changed before deployment 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log("db connected!");

  var ObjectSchema = new mongoose.Schema({
    lost : Boolean,
    found : Boolean,
    category : String,
    keyWords : String,
    comments : String
  })

  var UserSchema = new mongoose.Schema({
    username : {
      type : String,
      require : true,
      uniq : true
    },
    password : {
      type : String,
      require : true
    },
    name : String,
    email : {
      type : String,
      uniq : true,
    },
    lost : [ObjectSchema],
    found : [ObjectSchema]
  });

  var User = mongoose.model('User',UserSchema);

  var testUser = {
    username : 'lulu',
    password : '1234',
    name : 'luisa',
    email : "lufeza95@gmail.com"
  }
  // User.create([testUser]);

})
