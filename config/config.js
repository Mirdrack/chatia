var enviroment = process.env.ENVIROMENT;

var config = {};
config.app = {};
config.database = {};

switch(enviroment) {
    
    case 'heroku':
        
        config.app.port = process.env.PORT;
        config.sessionOptions = {

			secret: process.env.SECRET,
			key: 'express.sid',
			httpOnly: false,
			resave: true, 
			saveUninitialized: true
		};
		config.database.url = process.env.DATABASE;
        break;

    case 'production':
    case 'development':
    default:
        
        require('dotenv').config();
        config.app.port = process.env.PORT;
        config.sessionOptions = {

			secret: process.env.SECRET,
			key: 'express.sid',
			httpOnly: false,
			resave: true, 
			saveUninitialized: true
		};
		config.database.url = process.env.DATABASE;
}

module.exports = config;
