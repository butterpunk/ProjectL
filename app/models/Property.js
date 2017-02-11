// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Property', {
	user_id: {type : String, default: ''},
	profile_photo_location : {type : String, default: ''},
	address : {type : String, default: ''},
	price : {type : String, default: ''}
});
