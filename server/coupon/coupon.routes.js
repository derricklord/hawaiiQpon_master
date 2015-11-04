var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var Coupon = require('../coupon/coupon.model');
var User = require('../user/user.model');

var config = require('../config');
var util = require('../util/lib.js');

//Show all coupons
router.get('/all', function(req, res){
    Coupon.find({})
        .populate('owner')     
        .exec(function(err, coupons){
            res.send({coupons:coupons});
        });
    

});

//Show all active coupons
router.get('/active', function(req, res){
    Coupon.find({active:true})
        .exec(function(err, coupons){
            res.send({coupons:coupons});
        });
    

});

//Show all Coupons
router.get('/', function(req, res){
    Coupon.find({})
    .populate('owner')
    .exec(function(err, coupons) { 
        res.send(coupons)
    });
});

// Upload Coupon
router.get('/upload', function(req, res){
    console.log('Uploading coupon');
    res.send({message:'File Uploaded!'});
});

// Find Coupon by id.
router.get('/:id', function(req, res) {
    Coupon.findOne({_id: req.params.id})
        .populate('owner')
        .exec(function(err, coupon) {
            res.send(coupon)
        });    
});


//Create a Coupon
router.post('/', util.ensureAuthenticated, function(req, res) {
    
  var coupon = new Coupon();
    coupon.title = req.body.title;
    coupon.desc = req.body.desc;
    coupon.desc2 = req.body.desc2;
    coupon.category = req.body.category;
    coupon.owner = req.user;
    coupon.hasExpiration = req.body.expires;
    coupon.created_on = Date.now();
    coupon.expiration = req.body.expiration;    
    coupon.hasImage = req.body.hasImage;
    coupon.img = req.body.img;
    coupon.active = req.body.active;
    coupon.resource_url = req.body.resource_url;
    coupon.premium = req.body.premium;
    coupon.promo_code = req.body.code;
    coupon.vendor = req.body.vendor;
    coupon.vendor_url = req.body.vendor_url;
    coupon.vendor_phone = req.body.vendor_phone;
    /*
    if(req.body.vendorInfo){
        coupon.vendorInfo = req.body.vendorInfo;
    }
    */
    
 
    if(req.body.locations){
        var locations = req.body.locations;
        locations.forEach(function(location){
            coupon.locations.push({
                url: location.url,
                place_id: location.place_id,
                address: location.address,
                loc: {
                    lat: location.loc.lat,
                    long: location.loc.long
                }
            });
        });
    }
    
  coupon.save(function(err) {
    //console.log('Saving Coupon...');
    //console.log(coupon);
    res.send({ coupon: coupon });
  });

});

//Add a Coupon Location
router.post('/:id/location', util.ensureAuthenticated, function(req, res) {
  var location = req.body;

  Coupon.findOne({_id: req.params.id})
        .exec(function(err, coupon){
             coupon.locations.push({
                  url:  location.url,
                  place_id: location.place_id,
                  address: location.address,
            });
            coupon.save(function(err){
                res.send({coupon:coupon});
            });           
        });
});

// Update Coupon by id.
router.put('/:id', util.ensureAuthenticated, function(req, res) {
    
  Coupon.findById(req.params.id, function(err, coupon){
        if(req.body.title){
            coupon.title = req.body.title;
        }
        
        if(req.body.desc){
            coupon.desc = req.body.desc;
        }
        
        if(req.body.desc2){
            coupon.desc2 = req.body.desc2;
        }
        
        if(req.body.category){
            coupon.category = req.body.category;
        }
        
        if(req.body.hasExpiration){
            coupon.hasExpiration = req.body.expires;
        }
        
        if(req.body.expiration){
            coupon.expiration = req.body.expiration;
        }    
        
        if(req.body.hasImage){
            coupon.hasImage = req.body.hasImage;
        }
        
        if(req.body.vendorInfo){
            coupon.vendorInfo = req.body.vendorInfo;
        }
        
        if(req.body.vendor){
            coupon.vendor = req.body.vendor;
        }
      
      
        if(req.body.isActive){
            coupon.isActive = req.body.isActive;
        }
      
        if(req.body.desc){
            coupon.desc = req.body.desc;
        }
      
        if(req.body.resource_url){
            coupon.resource_url = req.body.resource_url;
        }
      
        coupon.save(function(err){
            res.send({coupon:coupon});
        });
  });
                
});

// Delete Coupon by id.
router.delete('/:id', util.ensureAuthenticated, function(req, res) {
  Coupon.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});





module.exports = router;












