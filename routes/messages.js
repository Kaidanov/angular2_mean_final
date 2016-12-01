/**
 * Created by Tzvika on 11/21/2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');


//populate - mongoose method to expand a data we are retrieving
router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error has occured!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            });
        });
});

//passing the token in a query string
router.use('/',function(req,res,next){
    jwt.verify(req.query.token, 'secret' , function(err, decoded){
        if(err){
            return  res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        }
        next();
    })
});

//save the messages
//each post getting here has a /message at the begininng of the url
router.post('/', function (req, res, next) {
    //retrieving user from a token
    //no validity check only decoding the token
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error has occured!',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content , //populated to the request body in the field named content by us
            user : user
        });

        message.save(function(err,result){
            if(err){
                // return stops the flow and gets the err message
                // if return removed the flow will continue
                return res.status(500).json({
                    title: 'An error has occured!',
                    error: err
                });
            }


            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Message',
                obj: result //the object from Mongodb as saved
            });
        });
    });



});

router.patch('/:id', function(req,res,next){

  Message.findById(req.params.id, function(err,message){
       if(err){
           // return stops the flow and gets the err message
           // if return removed the flow will continue
           return res.status(500).json({
               title: 'An error has occured!',
               error: err
           });
       }

       if(!message){
           return res.status(500).json({
               title: 'No message found!',
               error: {message: 'Message not found'}
           });
       }

       //check that the user updating the message is the one created it.
      var decoded = jwt.decode(req.query.token);
      if(message.user != decoded.user._id){
           return  res.status(401).json({
               title: 'Not authenticated',
               error: {message: 'Users do not match'}
           });
       }
       message.content = req.body.content;
       message.save(function(err,result){
           if (err) {
               return res.status(500).json({
                   title: 'An error has occured!',
                   error: err
               });
           }
           res.status(200).json({
               message: 'Updated message',
               obj: result
           });

       });


   }) ;
});


router.delete('/:id', function(req,res,next){
    Message.findById(req.params.id, function(err,message){
        if(err){
            // return stops the flow and gets the err message
            // if return removed the flow will continue
            return res.status(500).json({
                title: 'An error has occured!',
                error: err
            });
        }

        if(!message){
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'Message not found'}
            });
        }
        var decoded = jwt.decode(req.query.token);
        if(message.user != decoded.user._id){
            return  res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.remove(function(err,result){
            if (err) {
                return res.status(500).json({
                    title: 'An error has occured!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });

        });


    }) ;
});


module.exports = router;