var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    e_fullname: {type: String, required: true},
    e_email: { type: String, required: true },
    e_mobileno: { type: String, required: true },
    e_pswd: { type: String , required:true },
    e_conf_pswd:{ type: String , required:true },
    e_address: { type: String },
    e_skill: {type: String}


});
module.exports =mongoose.model('EmployeeInfo',schema);