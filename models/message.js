/**
 * Created by Tzvika on 11/20/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User  = require('./user');

var schema = new Schema({
    content: {type:String , required:true},
    user: {type: Schema.Types.ObjectId ,ref: 'User'} //internal object id of the objects mongo uses internal
    ///rref holds a connection to other model
});

//listener to after the action we are listeneing to - remove
schema.post('remove' , function(message){
    User.findById(message.user, function(err, user){
       user.messages.pull(message);
       user.save();
    });
});

///making model available for creation new Message() in other files
module.exports = mongoose.model('Message', schema);