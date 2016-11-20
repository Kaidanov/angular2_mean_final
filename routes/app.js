// a file of routes for application
var express = require('express');
var router = express.Router();
var User = require('../models/user');
///as a contibue of the root app.js
///this is the route for returning to the client
/// angular2
///request and responce comes from express
/// and it responce only to '/' route
router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc){
       if(err)
       {
           return res.send('Error!');
       }
       res.render('node', {email: doc.email});
    });
});



//get the data from post request and redirect the data to get request
router.post('/', function (req, res, next) {
    var email = req.body.email;
    var user = new User({
       firstName: 'Tzvi',
        lastName: 'Kai',
        password: 'secretfield',
        email: email
    });
    user.save();
    res.redirect('/'); // sending parameter to get request of message up here
});


module.exports = router;
