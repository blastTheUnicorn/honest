var mongoose = require('mongoose');


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

mongoose.model('User',UserSchema)

  var testUser = {
    username : 'lulu',
    password : '1234',
    name : 'luisa',
    email : "lufeza95@gmail.com"
  }
  // User.create([testUser]);

