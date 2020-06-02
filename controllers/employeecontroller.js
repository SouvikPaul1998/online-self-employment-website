const EmployeeInfo = require("../models/employeeinfo");
var expressValidator =require('express-validator');
var expressSession =require('express-session');
const JobInfo = require("../models/jobinfo");

const Employeeregistration = ( req, res ) => 
   {
    console.log("INSIDE Employee REG CONTROLLER");
     
    var userobj = new EmployeeInfo({
        e_fullname:req.body.e_fullname,
       e_email:req.body.e_email,
        e_mobileno:req.body.e_mobileno,
        e_gender:req.body.e_gender,
        e_pswd:req.body.e_pswd,
        e_conf_pswd:req.body.e_conf_pswd,
        e_address:req.body.e_address,
         e_Guitarist:req.body.e_Guitarist,
    e_Makeup_Artist:req.body.e_Makeup_Artist,
    e_Vocalist:req.body.e_Vocalist,
    e_Event_Organizers:req.body.e_Event_Organizers,
    e_Photography:req.body.e_Photography

                });
    var checkemail=req.body.e_email;


req.check('e_email','Invalid email address').isEmail();
req.check('e_pswd',"Password is invalid or doesnot match Confirm Password").isLength({min:6}).equals(req.body.e_conf_pswd);
req.checkBody('e_gender',"Please enter Gender").notEmpty();
req.checkBody('e_fullname','Please enter  your Full name').notEmpty();
req.checkBody('e_mobileno',"Please enter Contact number ").notEmpty(); 






    //checking for validations
var errors =req.validationErrors();
if (errors){
  req.session.errors =errors;
  req.session.success = false;
   res.redirect('/employee/registration'); 
}

else{
//checking if enail is present
    EmployeeInfo.find({"e_email":checkemail},(err,getmatcheddocumentfrommongodb)=>{

      if(!err){
       console.log("No error getting email from database");
        alreadyregistered=getmatcheddocumentfrommongodb.length >0;
        if (alreadyregistered) {
          var flag =0;
          console.log("Already registered");
          res.redirect('/employee/registration');
        }
        else{
          console.log("Not registered");
           req.session.success = false;
    userobj.save(( err, inserteddocument) => 
    {
        if (!err) {
           res.render('./employeepart/employeelogin');
           console.log("running obj.save");
         }
        else 
           console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 

    });
        }

      }
      else{
console.log("Error error getting email from database");
      }
    });

 
  
  
 
  }
  


  };

  

//Checking for login
   const employeeCheckLogin = ( req, res ) => 
   {
    console.log("INSIDE USER CHECK LOGIN CONTROLLER");
    
    var e_email = req.body.e_email;
    var e_pswd = req.body.e_pswd;
    
    EmployeeInfo.find({"e_email": e_email,"e_pswd": e_pswd}, (err, getmatcheddocumentfrommongodb) => 
    {
       if (!err) 
       {
         hasAnyUser = getmatcheddocumentfrommongodb.length > 0 ;
         if(hasAnyUser){
          console.log("Inside find");
          req.session.e_email=e_email;
          console.log(req.session.e_email);
          res.render("./employeepart/employeeafterlogin",{email:req.session.e_email});

        console.log("Logged in");
      }
           // res.redirect('/user/userafterlogin');
         else
            res.render('./employeepart/employeelogin',{hasusernotloggedin : true});
       }
       else 
         console.log('Error in Retriving USER :' + JSON.stringify(err, undefined, 2)); 
     
    });
  
  };


    //EMPLOYEE JOB SEARCH

const EmployeeJobSearch = ( req, res ) => 
{
  var skill = req.body.skill;

  console.log("INSIDE EMPLOYEE SEARCH JOB CONTROLLER  " + skill);

  JobInfo.find({"categories": skill}, (err, getsearchedjobforemployeefrommongodb) => 
  {
     if (!err) 
     {
        status = true;
        hasAnyJobForEmployee = getsearchedjobforemployeefrommongodb.length > 0 ;
        res.render('./employeepart/employeeafterlogin',{getsearchedjobforemployeefrommongodb,hasAnyJobForEmployee,status}); 
     }
     else 
       console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 
   
  });

 };
 

    
  module.exports = { Employeeregistration ,employeeCheckLogin , EmployeeJobSearch};