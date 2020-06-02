var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
   
    a_email: { type: String , required: true},
    a_date:{type:Date},
    jobid:{type:Number},
    h_email:{type:String}
    

});
module.exports =mongoose.model('applyInfo',schema);