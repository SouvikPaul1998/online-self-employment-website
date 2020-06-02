const HirerInfo = require("../models/hirerinfo");
var expressValidator =require('express-validator');
var expressSession =require('express-session');

const Hirerregistration = ( req, res ) => 
   {
    console.log("INSIDE Employee REG CONTROLLER");
     
    var hirerobj = new HirerInfo({
        h_fullname:req.body.h_fullname,
       h_email:req.body.h_email,
        h_mobileno:req.body.h_mobileno,
        h_gender:req.body.h_gender,
        h_pswd:req.body.h_pswd,
        h_conf_pswd:req.body.h_conf_pswd,
        h_address:req.body.h_address,

                });
    var checkemail=req.body.h_email;

req.check('h_email','Invalid email address').isEmail();
req.check('h_pswd',"Password is invalid or doesnot match Confirm Password").isLength({min:6}).equals(req.body.h_conf_pswd);
req.checkBody('h_gender',"Please enter Gender").notEmpty();
req.checkBody('h_fullname','Please enter  your Full name').notEmpty();
req.checkBody('h_mobileno',"Please enter Contact number ").notEmpty(); 
var errors =req.validationErrors();
if (errors){
  req.session.errors =errors;
  req.session.success = false;
res.redirect('/hirer/registration'); 
}

else{
    hirerobj.save(( err, inserteddocument) => 
    {
        if (!err) {
           res.render('./hirerparts/hirerlogin');
           console.log("running obj.save");
         }
        else 
           console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
    });
  }
  
  };
   const hirerCheckLogin = ( req, res ) => 
   {
    console.log("INSIDE USER CHECK LOGIN CONTROLLER");
    
    var h_email = req.body.h_email;
    var h_pswd = req.body.h_pswd;

    
    HirerInfo.find({"h_email": h_email,"h_pswd": h_pswd}, (err, getmatcheddocumentfrommongodb) => 
    {
       if (!err) 
       {
         hasAnyUser = getmatcheddocumentfrommongodb.length > 0 ;
         if(hasAnyUser){
          req.session.h_email=h_email;
          console.log(req.session.h_email);
          res.render("./hirerparts/hirerhome",{email:req.session.h_email});

        console.log("Logged in");
      }
           // res.redirect('/user/userafterlogin');
         else
            res.render('./hirerparts/hirerlogin',{hasusernotloggedin : true});
       }
       else 
         console.log('Error in Retriving USER :' + JSON.stringify(err, undefined, 2)); 
     
    });
  
  };

  //EMPLOYEE SEARCH
const HirerSearchEmployee = ( req, res ) => 
{
  var s_skill = req.body.s_skill;

  console.log("INSIDE ADMIN SEARCH USER CONTROLLER  " + useremail);

  EmployeeInfo.find({"e_skill": s_skill}, (err, getsearchedemployeefrommongodb) => 
  {
     if (!err) 
     {
        status = true;
        hasAnyEmployee = getsearchedemployeefrommongodb.length > 0 ;
        res.render('./hirerparts/hirersearch',{getsearchedemployeefrommongodb,hasAnyEmployee,status}); 
     }
     else 
       console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 
   
  });

 };
 

    
  module.exports = { Hirerregistration ,hirerCheckLogin , HirerSearchEmployee};