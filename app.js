var config = require('./config/config');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash-light');
var app = express();

app.use(cookieParser());
app.use(session(config.sessionOptions));
app.use(flash());

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

var routes = require('./routes/routes')(app);

var server = app.listen(config.app.port, function () {

	console.log('Listening on port %d', server.address().port);
});