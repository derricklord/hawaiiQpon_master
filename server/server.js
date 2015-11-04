//Load Userland npm Modules
var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var async = require('async');
var request = require('request');

var util = require('./util/lib.js');
var config = require('./config');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

//Load Custom Routes
var couponRoutes = require('./coupon/coupon.routes');
var authRoutes = require('./auth/auth.routes');
var analyticRoutes = require('./analytics/analytics.routes');
var profileRoutes = require('./profile/profile.routes');
var commonRoutes = require('./common/common.routes');
var userRoutes = require('./user/user.routes');
var vendorRoutes = require('./vendor/vendor.routes');

//Initialize Server
var app = express();
var production = false;

var done = false;
var filename = '';

if(production){
  var port = process.env.PORT || 80;
  var sslport = process.env.SSLPORT || 443;
  //Initialize Database
  mongoose.connect(config.MONGO_URI);
  mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  }); 
}else{
  var port = process.env.PORT || 3000;
  var sslport = process.env.SSLPORT || 8443;
  
  //Initialize Database
  mongoose.connect(config.MONGO_URI);
  mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  });  
}



//Configure Server Environment

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, '../client')));

/*Configure the multer.*/

app.use(multer({ 
    dest:  path.join(__dirname, '../client/uploads'),
    rename: function (fieldname, filename) {
        return filename;
      },
    onFileUploadStart: function (file) {
      //console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
      //console.log(file.fieldname + ' uploaded to  ' + file.path)
      done=true;
      filename = file.fieldname;
    }
}));

app.use('/auth', authRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/analytics', analyticRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/', commonRoutes);


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, function(){
  console.log('Server listening on port ' + port);
});

httpsServer.listen(sslport, function(){
  console.log('Secure Server listening on port ' + sslport);
});

/*
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
*/