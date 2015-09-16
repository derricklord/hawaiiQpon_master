var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var Coupon = require('../coupon/coupon.model');
var User = require('../user/user.model');

var config = require('../config');
var util = require('../util/lib.js');

// Find Profile by id.
router.get('/', util.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.user})
        .exec(function(err, profile) {
            res.send(profile);
        });    
}); 



module.exports = router;