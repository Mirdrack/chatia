var routes = function (app, passport) {

	app.get('/', function (req, res) {
	
		res.render('index.jade');
	});

	app.get('/login', function(req, res) {
		
		res.render('login.jade', { message: req.flash('loginMessage') }); 
	});

	app.get('/signup', function(req, res) {
		
		res.render('signup.jade', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));
};

module.exports = routes;