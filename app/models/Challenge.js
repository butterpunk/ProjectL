var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var Post = new Schema({
	title : {type : String, default: ''},
	content : {type : String, default: ''}
});

// Exports the Challenge for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('Post', Post);


