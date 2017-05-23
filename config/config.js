require('dotenv').config();

var environment = process.env.ENVIRONMENT;
var config = {};
config.app = {};
config.database = {};
        
config.app.port = process.env.PORT;
config.sessionOptions = {

	secret: process.env.SECRET,
	key: 'express.sid',
	httpOnly: false,
	resave: true, 
	saveUninitialized: true
};
config.database.url = process.env.DATABASE_URL;

module.exports = config;
