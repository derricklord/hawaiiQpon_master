var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('./user.model');

var config = require('../config');
var util = require('../util/lib.js');


//Show all Users
router.get('/', function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});

// Find User by id.
router.get('/:id', util.ensureAuthenticated, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send({ user: user });
  });
});

//Create a User
router.post('/', util.ensureAuthenticated, function(req, res) {
  var user = new User(req.body);
  
  user.save(function(err) {
    res.send({ user: user });
  });

});

// Update User by id.
router.put('/:id', util.ensureAuthenticated, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.send({ user: req.body });
  });
});

// Delete User by id.
router.delete('/:id',  function(req, res) {
  User.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});



module.exports = router;