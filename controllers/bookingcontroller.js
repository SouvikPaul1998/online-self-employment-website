var expressValidator =require('express-validator');
var hirercontroller =require('../controllers/hirercontroller');
var nodemailer = require('nodemailer');
var expressSession =require('express-session');
var dateTime = require('node-datetime');
var bookinginfo=require("../models/bookinginfo");
var hirerInfo = require("../models/hirerinfo");

const employeebooking=(req,res)=>{
  console.log("this is employeebooking");
  var e_email=req.body.emailid;
  var b_date=req.body.a_date;
  var h_email = req.session.h_email;

console.log(b_date);
console.log(e_email);
console.log(h_email);

//email sending part

var transporter = nodemailer.createTransport({
  service: 'gmail',
  tls: { rejectUnauthorized: false },
  auth: {
    user: 'webdevglobesyn.group@gmail.com',
    pass: '12345@67890',
  }
});

var mailOptions = {
  from: req.session.h_email,
  to: e_email,
  subject: 'Sending Email using Node.js',
  text: 'You have been selected for the post of job  '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});






//boooking part
var bookingobj=new bookinginfo({
	 e_email:e_email,
   h_email:h_email,
	 Bookingdate:b_date

});
console.log(h_email);
 bookinginfo.find({"e_email":e_email,"Bookingdate":b_date},(err,getmatcheddocumentfrommongodb)=>{
 	if(!err){
       console.log("No error getting email from database");
        alreadybooked=getmatcheddocumentfrommongodb.length >0;
        if (alreadybooked) {
          var flag =0;
          console.log("Already registered");
          res.render('./hirerparts/hirerbooked');
        }
      else{

 bookingobj.save(( err, inserteddocument) => 
    {
        if (!err) {
           res.render('./hirerparts/hireremployeebooked');
           console.log("running jobobj.save");
         }
        else 
           console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
    }

    );
}
}
 else{
 	console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
 }

});
}



module.exports ={employeebooking};
