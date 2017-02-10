var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080; // set our port
var passport = require('passport');
var config = require('./config/config');

// Connect to mongodb
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(config.db, options);
};
connect();
app.use(passport.initialize());

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.set('debug', true);


// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});


// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
var router = express.Router();
require('./config/routes')(router, passport);

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);


module.exports = app;