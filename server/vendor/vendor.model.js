var mongoose = require('mongoose');
var User = require('../user/user.model');
var ObjectId = mongoose.Schema.ObjectId;

var vendorSchema = new mongoose.Schema({
	name: String,
	website: String,
	phone: String,
	logo: String,
	owner: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Vendor', vendorSchema);
	