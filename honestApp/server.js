var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');


var app = express();


var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/test', function(req, res){
  res.statusCode = 200;
  res.send(new Buffer('Hello World!'));
})

var server = app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port)
})

module.exports = server;
