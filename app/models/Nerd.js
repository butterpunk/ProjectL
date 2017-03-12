// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Profile', {
	user_id: {type : String, default: ''},
	profile_photo_location : {type : String, default: ''},
	profile_photo_name: {type : String, default: ''},
	name : {type : String, default: ''},
	age : {type : String, default: ''},
	dob: {type : String, default: ''} ,
	identification: {type : String, default: ''} ,
	phone_number: {type : String, default: ''} ,
	email: {type : String, default: ''} ,
	curent_address: {type : String, default: ''} ,
	leasor: {type : String, default: ''} ,
	income: {type : String, default: ''} ,
	credit_score: {type : String, default: ''} ,
	criminal_check: {type : String, default: ''} ,
	occupation: {type : String, default: ''} ,
	employer: {type : String, default: ''} ,
	animal_exist: {type : String, default: ''} ,
	animal_breed: {type : String, default: ''} ,
	education: {type : String, default: ''} ,
	current_stat: {type : String, default: ''} ,
	facebook: {type : String, default: ''} ,
	google: {type : String, default: ''} ,
	linked: {type : String, default: ''} ,
	reference_name: {type : String, default: ''} ,
	reference_number: {type : String, default: ''} ,
	roomates: {type : String, default: ''} ,
	age: {type : String, default: ''} ,
	hobbies: {type : String, default: ''} ,
	file_data: {type : String, default: ''} ,
});

