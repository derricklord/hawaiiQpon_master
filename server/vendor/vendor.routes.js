var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var Vendor = require('../vendor/vendor.model');
var User = require('../user/user.model');

var config = require('../config');
var util = require('../util/lib.js');



//Show all Vendors
router.get('/',  function(req, res){
    Vendor.find({})
    .populate('owner')
    .exec(function(err, vendors) { 
        res.send(vendors)
    });
});

//Show my Vendors
router.get('/my', util.ensureAuthenticated, function(req, res){
    Vendor.find()
    .populate('owner')
    .where({owner: req.user})
    .exec(function(err, vendors) { 
        res.send(vendors)
    });
});

// Upload Vendor Logo
router.get('/upload', function(req, res){
    console.log('Uploading logo');
    res.send({message:'Logo Uploaded!'});
});


// Find Vendor by id.
router.get('/:id', util.ensureAuthenticated, function(req, res) {
    Vendor.findOne({_id: req.params.id})
        .populate('owner')
        .exec(function(err, vendor) {
            res.send(vendor);
        });    
});


//Create a Vendor
router.post('/', util.ensureAuthenticated, function(req, res) {
    
  var vendor = new Vendor();
    vendor.name = req.body.name;
    vendor.website = req.body.website;
    vendor.phone = req.body.phone;
    vendor.logo = req.body.logo;
    vendor.owner = req.user;

  vendor.save(function(err) {
    res.send({ vendor: vendor });
  });

});



// Update Vendor by id.
router.put('/:id', util.ensureAuthenticated, function(req, res) {
    
  Vendor.findById(req.params.id, function(err, vendor){

        if(req.body.name){
            vendor.name = req.body.name;
        }
      
      
        if(req.body.website){
            vendor.website = req.body.website;
        }
      
        if(req.body.phone){
            vendor.phone = req.body.phone;
        }
      
        if(req.body.logo){
            vendor.logo = req.body.logo;
        }
      
        vendor.save();
        res.send({vendor: vendor});
  });
                
});

// Delete Vendor by id.
router.delete('/:id', function(req, res) {
  Vendor.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});





module.exports = router;