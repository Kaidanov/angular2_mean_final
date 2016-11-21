///all the requests go through the prism of this file's logic
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
//var messagesRoutes = require('./routes/messages');
//var userRoutes = require('./routes/user');

var app = express();

//connecting to mongodb
//from running server gather the port
//creating the db if not existing
mongoose.connect('localhost:27017/node-angular');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//define the type of templates you are using
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//defining the public folder that will be available from server and from client as one.
//all the rest folders are hidden from the client
app.use(express.static(path.join(__dirname, 'public')));

///cross domain handler
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


//messageRoutes needs to come first  and have a prefix of /message
//app.use('/message', messageRoutes);
app.use('/', appRoutes);

//sending back to the angular2 application and there
//handle the errors if needed
//those lines just serve always even when 404 to client Angular2
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
