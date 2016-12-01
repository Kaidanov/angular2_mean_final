/**
 * Created by Tzvika on 11/21/2016.
 */
// a file of routes for application
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');


//TODO : add ssl
router.post('/', function (req, res, next) {
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : bcrypt.hashSync(req.body.password, 10), //salt is the number of rounds to encrypt, how strong it is. you can't decrypt it. It's one way encryption
        email : req.body.email,
    });

    user.save(function(err,result){
        if(err){
            // return stops the flow and gets the err message
            // if return removed the flow will continue
            return res.status(500).json({
                title: 'An error has occured!',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result //the object from Mongodb as saved
        });
    });
});

router.post('/signin', function (req, res, next) {
    //find all fitting ang get the first one
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            // return stops the flow and gets the err message
            // if return removed the flow will continue
            return res.status(500).json({
                title: 'An error has occured!',
                error: err
            });
        }

        if(!user){
            // return stops the flow and gets the err message
            // if return removed the flow will continue
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        // the bcrypt creates a new hash
        // but it can check if it is comparable
        // to the primarelly saved password
        if( !bcrypt.compareSync(req.body.password, user.password)){
            return  res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }

        //creating token for checking later that the user is authenticated
        //json web token - jwt
        //sign - creates the token
        //first param -  payload can be any data we want that we want to retrieve after
        // securelly sending it ver the http
        // second param - is the secret world by it token is created
        // third param - configuration of token , in our case expiration
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token : token,
            userId: user._id
        });

    });


});



module.exports = router;
