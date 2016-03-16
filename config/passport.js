var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {

            done(err, user);
        });
    });

    /**
     * we are using named strategies since we have one for login and one for signup
	 * by default, if there was no name, it would just be called 'local'
     */
    passport.use('local-signup', new LocalStrategy({
        
        // By default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // Allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {

            console.log(req);
            console.log(password);
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
            
            /**
             * Find a user whose email is the same as the forms email
    		 * We are checking to see if the user trying to login already exists
             */
            User.findOne({ 'local.email' :  email }, function(err, user) {

                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } 
                else {
    				
                    // If there is no user with that email we create the user
                    var newUser            = new User();

                    // Set the user's local credentials
                    newUser.local.username = req.body.username;
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

				    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));


    passport.use('local-login', new LocalStrategy({

        // By default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { 
        
        /**
         * Callback with email and password from our form
         * find a user whose email is the same as the forms email
         * we are checking to see if the user trying to login already exists
         */
        User.findOne({ 'local.email' :  email }, function(err, user) {
            
            // If there are any errors, return the error before anything else
            if (err)
                return done(err);

            // If no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // If the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // Create the loginMessage and save it to session as flashdata

            // All is well, return successful user
            return done(null, user);
        });
    }));
};