var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	email: {type : String, default: ''},
	password: {type : String, default: ''},
	facebook_id: {type : String, default: ''},
	facebook_token: {type : String, default: ''},
	facebook_name: {type : String, default: ''},
	facebook_email: {type : String, default: ''},
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);