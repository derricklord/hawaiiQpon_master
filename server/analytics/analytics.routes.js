var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var Coupon = require('../coupon/coupon.model');
var Analytics = require('../analytics/analytics.model');

var config = require('../config');
var util = require('../util/lib.js');

//Show all Analytics
router.get('/', function(req, res){
    Analytics.find({})
    .populate('coupon')
    .exec(function(err, logs) { 
        res.send(logs);
    });
});


// Find Log Entry by id.
router.get('/coupon/:id', function(req, res) {
    Analytics.findOne({})
        .populate('coupon')
        .where('coupon.id').equals(req.params.id)
        .exec(function(err, logs) {
            res.send({err:err, logs:logs});
        });    
});

module.exports = router;