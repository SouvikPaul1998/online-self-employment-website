var expressValidator =require('express-validator');
//var hirercontroller =require('../controllers/hirercontroller');
var expressSession =require('express-session');
var dateTime = require('node-datetime');
var applyInfo=require("../models/applyInfo");
var jobInfo = require("../models/jobinfo")

const jobapplication=(req,res)=>{
  console.log("this is jobapplication");

console.log(req.session.e_email);
console.log(req.session.h_email);
var dt = dateTime.create();
dt.format('m/d/Y');

var a_date=new Date(dt.now());
var applyobj=new applyInfo({
	 a_email: req.session.e_email,
   h_email: req.body.emailid,
	 a_date: a_date

});

 applyobj.save(( err, inserteddocument) => 
    {
        if (!err) {
           res.render('./employeepart/employeeapplied');
           console.log("running jobobj.save");
         }
        else 
           console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
    }
    );

}

jobapplicationdisplay=(req,res)=>{
  applyInfo.find({h_email:req.session.h_email},(err,getmatcheddocuments) => {
  
    if (!err) 
         {
          status = true;
          console.log(getmatcheddocuments.length);
          console.log(req.session.h_email);
            hasAnyUser = getmatcheddocuments.length > 0 ;
            console.log("comming here");
            res.render('./hirerparts/hirerapplicationview',{getmatcheddocuments,hasAnyUser,status}); 
         }
         else 
           console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 

  });
}



module.exports={jobapplication,jobapplicationdisplay};