var express = require('express');

var util = require('../util/lib.js');
var User = require('../user/user.model');
var router = express.Router();



// Upload Coupon
router.post('/uploads', function(req, res){
    //console.log('Uploading coupon');
    res.send({message:'File Uploaded!'});
});

// Upload Coupon

router.get('/uploads', function(req, res){
    //console.log('Uploading coupon');
    res.send({message:'File Uploaded!'});
});


module.exports = router;