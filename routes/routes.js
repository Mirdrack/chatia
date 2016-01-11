var routes = function (app, passport) {

	app.get('/', function (req, res) {
	
		res.render('index.jade');
	});

	app.get('/login', function(req, res) {
		
		// render the page and pass in any flash data if it exists
		res.render('login.jade'/*, { message: req.flash('loginMessage') }*/); 
	});
};

module.exports = routes;