/**
 * Created by Tzvika on 11/20/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type:String , required:true},
    user: {type: Schema.Types.ObjectId ,ref: 'User'} //internal object id of the objects mongo uses internal
    ///rref holds a connection to other model
});

///making model available for creation new Message() in other files
module.exports = mongoose.model('Message', schema);