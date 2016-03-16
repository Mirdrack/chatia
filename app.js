var config = require('./config/config');
var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash-light');
var passport = require('passport');
var app = express();


// mongoose.connect(config.database.url);

var MongoDB = mongoose.connect(config.database.url).connection;
MongoDB.on('error', function(err) { console.log(err.message); } );
MongoDB.once('open', function() {

  console.log('MongoDB connection open...');
});


require('./config/passport')(passport);

app.use(cookieParser());
app.use(session(config.sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

var routes = require('./routes/routes')(app, passport);

var server = app.listen(config.app.port, function () {

	console.log('Listening on port %d', server.address().port);
});