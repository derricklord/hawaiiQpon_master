var mongoose = require('mongoose');
var User = require('../user/user.model');
var Vendor = require('../vendor/vendor.model');
var ObjectId = mongoose.Schema.ObjectId;

var couponSchema = new mongoose.Schema({
  title:  String,
  desc: String,
  desc2: String,
  owner: {type: ObjectId, ref: 'User'},   
  expiration: Date,
  hasExpiration: Boolean,
  created_on: Date, 
  active: Boolean,
  hasImage: Boolean,
  category: String,
  img: String,
  resource_url: String,
  promo_code: String,
  premium: Boolean,
  vendor: String,
  vendorInfo: {type: ObjectId, ref: 'Vendor'},
  locations: [
      {
        url:String,
        place_id:String,
        address: String,
        loc:{
            lat: String,
            long: String
        }  
      }
  ]
});

module.exports = mongoose.model('Coupon', couponSchema);
