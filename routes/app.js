// a file of routes for application
var express = require('express');
var router = express.Router();

///as a contibue of the root app.js
///this is the route for returning to the client
/// angular2
///request and responce comes from express
/// and it responce only to '/' route
router.get('/', function (req, res, next) {
    res.render('index');
});


//creting a new route for node.hbs view with message action sending
//parameter message to the view
//:msg added as parameter sent from the post message action down here
router.get('/message/:msg', function (req, res, next) {
    res.render('node', {message: req.params.msg});
});

//get the data from post request and redirect the data to get request
router.post('/message', function (req, res, next) {
    var message = req.body.message;
    res.redirect('/message/'+ message); // sending parameter to get request of message up here
});


module.exports = router;
