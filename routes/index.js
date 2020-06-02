var express = require('express');
var router = express.Router();
var employeecontroller =require('../controllers/employeecontroller');
var jobcontroller =require('../controllers/jobcontroller');
var applycontroller =require('../controllers/applycontroller');
var hirercontroller =require('../controllers/hirercontroller');
var adminController = require('../controllers/admincontroller');
var bookingcontroller =require('../controllers/bookingcontroller');
const mongoose =require('../dbconnect');

//LANDING PAGE
router.get('/', function(req, res, next) {
	res.render('index');
  });

//EMPLOYEE REGISTRATION
router.get('/employee/registration',function(req,res,next){
	res.render('./employeepart/employeereg',{success:req.session.success,errors: req.session.errors});
	console.log('From Employees reg page');
});

router.post('/employee/registration',function(req,res,next){
	res.render('./employeepart/employeereg',{success:req.session.success,errors: req.session.errors});
	console.log('From Employees reg page');
});

//EMPLOYEE REGISTRATION INSERT
router.post('/employee/employeedbinsert',employeecontroller.Employeeregistration);

//EMPLOYEE LOGIN
router.get('/employee/login',function(req,res,next){
	res.render('./employeepart/employeelogin');
});

router.post('/employee/login',function(req,res,next){
	res.render('./employeepart/employeelogin');
});
//EMPLOYEE LOGIN CHECK
router.post("/employee/employeelogincheck",employeecontroller.employeeCheckLogin);

//EMPLOYEE HOME
router.get('/employee/home', function(req, res, next) {
  
res.render('./employeepart/employeeafterlogin');

});

//EMPLOYEE PROFILE
router.get('/employee/profile', function(req, res, next) {
	res.render('./employeepart/employeeprofile');
});

//EMPLOYEE SEARCH JOB
router.get('/employee/searchjob', (req,res,next)=>{
	res.render('./employeepart/employeeafterlogin');
});
router.post("/employee/searchjob",jobcontroller.jobsearchemployee);

//EMPLOYEE APPLY JOB

router.post("/employee/applyjob",applycontroller.jobapplication);

//EMPLOYEE LOGOUT
router.get('/employee/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    console.log(req.session.e_email +" logged out");
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
      	//console.log(req.session.e_email +" logged out");
        return res.redirect('/');
      }
    });
  }
});
//HIRER REGISTRATION
router.get('/hirer/registration',function(req,res,next){
	res.render('./hirerparts/hirerreg',{success:req.session.success,errors: req.session.errors});
	console.log('From hirer reg page');
});

router.post('/hirer/registration',function(req,res,next){
	res.render('./hirerparts/hirerreg',{success:req.session.success,errors: req.session.errors});
	console.log('From hirer reg page');
});
//HIRER INSERT DB
router.post('/hirer/hirerdbinsert',hirercontroller.Hirerregistration);

//HIRER LOGIN
router.get('/hirer/login',function(req,res,next){
	res.render('./hirerparts/hirerlogin');
});

router.post('/hirer/login',function(req,res,next){
	res.render('./hirerparts/hirerlogin');
});
//HIRER LOGIN CHECK
router.post("/hirer/hirerlogincheck",hirercontroller.hirerCheckLogin);

//HIRER HOME
router.get('/hirer/home', function(req, res, next) {
  if(req.session.user){
	res.render('./hirerparts/hirerhome');
}
else{
  res.render('./hirerparts/hirerlogin');
}
 });

 //HIRER POST JOB
router.get('/hirer/insertjob',(req,res,next)=>{
  
	res.render('./hirerparts/hirerafterlogin');

});

//HIRER SEARCH EMPLOYEE

router.get('/hirer/searchemp', (req,res,next)=>{
  if (req.session.user) {
	res.render('./hirerparts/hirersearch');
}
else{
  res.render('./hirerparts/hirerlogin');
}
});

router.post('/hirer/searchemp' , hirercontroller.HirerSearchEmployee);

//HIRER JOB INSERT
router.post('/hirer/insertjob',jobcontroller.jobregistration);

//HIRER VIEW APPLICATIONS
router.get('/hirer/viewapplications',applycontroller.jobapplicationdisplay);

//HIRER JOB ACCEPT

router.get('/hirer/viewapplications',(req,res,next)=>{
  if (req.session.user) {
  res.render('./hirerparts/hirerapplicationview');
}
else{
  res.render('./hirerparts/hirerlogin');
}
});
router.post('/hirer/booked',bookingcontroller.employeebooking);

//HIRER LOGOUT
router.get('/hirer/logout', function(req, res, next) {
  if (req.session) {
    // delete session object

    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
      	//console.log(req.session.h_email +" logged out");
        return res.redirect('/');
      }
    });
  }
});

//ADMIN LOGIN
router.get('/admin/login', function(req, res, next) {
	res.render('./adminpart/adminsignin');
  });
  router.post('/admin/adminlogincheck', adminController.AdminLoginCheck);
  
  //ADMIN HOME
  router.get('/admin/adminhome', function(req, res, next) {
	 res.render('./adminpart/adminafterlogin');
  });
  
  //ADMIN VIEW ALL HIRER
  router.get('/admin/adminviewallhirer', adminController.AdminAllHirerView);
  
  
  //ADMIN VIEW ALL EMPLOYEE
  router.get('/admin/adminviewallemployee' , adminController.AdminAllEmployeeView);
  
  //ADMIN SEARCH HIRER
  router.get('/admin/adminsearchhirerinput', function(req, res, next) {
	res.render('./adminpart/adminsearchhirer');
  });
  router.post('/admin/adminsearchhirer', adminController.AdminHirerSearchView);
  
  //ADMIN SEARCH EMPLOYEE
  router.get('/admin/adminsearchempinput', function(req, res, next) {
	  res.render('./adminpart/adminsearchemp');
	});
  router.post('/admin/adminsearchemp', adminController.AdminEmpSearchView);
  
  //ADMIN DELETE HIRER
  router.post('/admin/admindeletehirer', adminController.AdminHirerDelete);
  
  //ADMIN DELETE EMPLOYEE
  router.post('/admin/admindeleteemp' , adminController.AdminEmployeeDelete);
  
  //ADMIN LOGOUT
  router.get('/admin/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      console.log(req.session.e_email +" logged out");
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          //console.log(req.session.e_email +" logged out");
          return res.redirect('/');
        }
      });
    }
  });
module.exports = router;