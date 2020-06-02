var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    h_fullname: {type: String, required: true},
    h_email: { type: String, required: true },
    h_mobileno: { type: String, required: true },
    h_pswd: { type: String , required:true },
    h_conf_pswd:{ type: String , required:true },
    h_address: { type: String },
    h_gender:{type:String,required:true},
    


});
module.exports =mongoose.model('HirerInfo',schema);