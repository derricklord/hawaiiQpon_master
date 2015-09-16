var mongoose = require('mongoose');
var Coupon = require('../coupon/coupon.model');
var ObjectId = mongoose.Schema.ObjectId;


var analyticsSchema = new mongoose.Schema({
  action:  String,
  coupon: {type: ObjectId, ref: 'Coupon'},   
  created_on: Date, 
  valid: Boolean,
});

module.exports = mongoose.model('Analytics', analyticsSchema);