var mongoose = require('mongoose');
//var schema =mongoose.Schema;

var schema =new mongoose.Schema({

bookingid: {type:Number},
e_email: { type: String, required: true },
h_email: { type: String, required: true },
Bookingdate:{type: Date},

});