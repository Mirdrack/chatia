var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// Definition for user model
var userSchema = mongoose.Schema({
    
    local: {
        username: String,
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name : String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    }
});

// Hash generation
userSchema.methods.generateHash = function(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    
    return bcrypt.compareSync(password, this.local.password);
};

// Creation the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);