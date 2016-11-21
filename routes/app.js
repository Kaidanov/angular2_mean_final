// a file of routes for application
var express = require('express');
var router = express.Router();

///as a contibue of the root app.js
///this is the route for returning to the client
/// angular2
///request and responce comes from express
/// and it responce only to '/' route
///only one root for angular2 single page application - SPA
router.get('/', function (req, res, next) {
     res.render('index');

});





module.exports = router;
