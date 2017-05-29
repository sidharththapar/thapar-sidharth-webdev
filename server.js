var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.get('/env', function(req, res) {
  var connectionString = 'blah';
  if(process.env.MLAB_WEBDEV_NEU_UNAME) { // check if running remotely
    var username = process.env.MLAB_WEBDEV_NEU_UNAME; // get from environment
    var password = process.env.MLAB_WEBDEV_NEU_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139761.mlab.com:39761/heroku_v7g71n9h'; // user yours
  }

  res.json({connectionString: connectionString});
});

require ("./test/app.js")(app);

var port = process.env.PORT || 4000;

app.listen(port);
