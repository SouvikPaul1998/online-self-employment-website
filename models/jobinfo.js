var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    jobid:{type: Number},
    h_email: {type: String , required: true},
    categories: { type: String, required: true },
    j_contactno: { type: String },
    j_name: { type : String, required:true},
    j_date: { type: Date , required:true },
    j_description:{ type: String , required:true },
    j_payment:{ type: String , required:true}
    


});
module.exports =mongoose.model('JobInfo',schema);