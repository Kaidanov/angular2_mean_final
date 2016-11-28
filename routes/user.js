/**
 * Created by Tzvika on 11/21/2016.
 */
// a file of routes for application
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

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





module.exports = router;
