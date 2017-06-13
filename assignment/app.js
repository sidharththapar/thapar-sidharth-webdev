var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/webdev';
if(process.env.MLAB_WEBDEV_NEU_UNAME) { // check if running remotely
    var username = process.env.MLAB_WEBDEV_NEU_UNAME; // get from environment
    var password = process.env.MLAB_WEBDEV_NEU_PASS;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds139761.mlab.com:39761/heroku_v7g71n9h'; // user yours
}

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
