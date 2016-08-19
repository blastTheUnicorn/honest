var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.use(express.static(__dirname + '/app'));
// app.use(bodyParser.urlencoded({'extended': 'true'}));
// app.use(bodyParser.json());

var port = process.env.PORT || 3000;
app.set('port', port);

app.get('/', function(req, res){
  res.send('Hello World!')
})

app.listen(port, function(){
  console.log('WE OUT HERE LISTENING BRUH!!! PORT ' + port)
})