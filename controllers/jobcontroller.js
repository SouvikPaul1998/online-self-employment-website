
var expressValidator =require('express-validator');
//var hirercontroller =require('../controllers/hirercontroller');
var expressSession =require('express-session');
var jobinfo=require("../models/jobinfo");


const jobregistration = ( req, res ) =>{
	console.log("Inside jobregistration");
    console.log(req.session.h_email);
    console.log(req.body.j_date);
    console.log('Registered');
	var h_email=req.session.h_email;

	jobinfo.find({},(err,getmatcheddocuments) =>{
    
    var jobid=getmatcheddocuments.length+1;


	var jobobj =new jobinfo({
    jobid:jobid,
    h_email:h_email,
    j_name: req.body.j_name,
    categories:req.body.categories ,
    j_contactno:req.body.j_contactno ,
    j_date:req.body.j_date,
    j_description:req.body.j_description,
    j_payment:req.body.j_payment
	});

    
	 jobobj.save(( err, inserteddocument) => 
    {
        if (!err) {
           res.render('./hirerparts/hirerjobposted');
           console.log("running obj.save");
           
         }
        else 
           console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); 
    });
	});
}

const jobsearchemployee=(req,res) => {
	var skill=req.body.skill;

	jobinfo.find({categories:skill},(err,getmatcheddocuments) => {
	
    if (!err) 
         {
         	status = true;
            hasAnyUser = getmatcheddocuments.length > 0 ;
            console.log("comming here");
            res.render('./employeepart/employeeafterlogin',{getmatcheddocuments,hasAnyUser,status}); 
         }
         else 
           console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 

	});
}


const jobdisplay=(res,req)=>{

	jobinfo.find({h_email:req.session.h_email},(err,getmatcheddocuments)=>{
	
    if (!err) 
         {
            hasAnyUser = getalldocumentsfrommongodb.length > 0 ;
            res.render('./adminpart/adminviewalluser',{getalldocumentsfrommongodb,hasAnyUser}); 
         }
         else 
           console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 

	})
}

module.exports={jobregistration,jobsearchemployee,jobdisplay};