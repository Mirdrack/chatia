var routes = function (app, passport) {

	app.get('/', function (req, res) {
	
		res.render('index.pug');
	});

	app.get('/login', function(req, res) {
		
		res.render('login.pug', { message: req.flash('loginMessage') }); 
	});

	app.get('/signup', function(req, res) {
		
		res.render('signup.pug', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	app.post('/login', passport.authenticate('local-login', {
		
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		
		res.render('profile.pug', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/chat', isLoggedIn, function(req, res) {
		
		res.render('chat.pug', {
			
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		
		req.logout();
		res.redirect('/');
	});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = routes;