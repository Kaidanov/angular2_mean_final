/**
 * Created by Tzvika on 11/21/2016.
 */
var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function (req, res, next) {
    Message.find()
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
//save the messages
//each post getting here has a /message at the begininng of the url
router.post('/', function (req, res, next) {
   var message = new Message({
        content: req.body.content  //populated to the request body in the field named content by us
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

       res.status(201).json({
           message: 'Saved Message',
           obj: result //the object from Mongodb as saved
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