const EmployeeInfo = require("../models/employeeinfo");
const HirerInfo = require("../models/hirerinfo");

//ADMIN LOGIN
const AdminLoginCheck = ( req, res ) => 
   {
    var adminuserid = req.body.adminuserid;
    var adminpassword = req.body.adminpassword;
     console.log("ADMIN USER ID " + adminuserid);
     console.log("ADMIN PASSWORD " + adminpassword);

     if((adminuserid === 'admin') && (adminpassword === 'admin'))
        res.redirect('/admin/adminhome');
     else
        res.render('./adminpart/adminsignin',{hasadminnotloggedin : true});
     
    };

//ADMIN ALL COMPANY VIEW
const AdminAllHirerView = ( req, res ) => 
    {
      console.log("INSIDE ADMIN VIEW ALL USER CONTROLLER");

      HirerInfo.find((err, getalldocumentsfrommongodb) => 
      {
         if (!err) 
         {
            hasAnyHirer = getalldocumentsfrommongodb.length > 0 ;
            res.render('./adminpart/adminviewallhirer',{getalldocumentsfrommongodb,hasAnyHirer}); 
         }
         else 
           console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 
       
      });
   
     };

// ADMIN ALL EMPLYEE VIEW
     const AdminAllEmployeeView = ( req, res ) => 
    {
      console.log("INSIDE ADMIN VIEW ALL USER CONTROLLER");

     EmployeeInfo.find((err, getalldocumentsfrommongodb) => 
      {
         if (!err) 
         {
            hasAnyEmp = getalldocumentsfrommongodb.length > 0 ;
            res.render('./adminpart/adminviewallemployee',{getalldocumentsfrommongodb,hasAnyEmp}); 
         }
         else 
           console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); 
       
      });
   
     };
//ADMIN SEARCH HIRER
const AdminHirerSearchView = ( req, res ) => 
     {
       var r_email = req.body.emailid;

       console.log("INSIDE ADMIN SEARCH USER CONTROLLER  " + r_email);
 
       HirerInfo.find({"h_email": r_email}, (err, getsearcheddocumentfrommongodb) => 
       {
          if (!err) 
          {
             status = true;
             hasAnyHirer = getsearcheddocumentfrommongodb.length > 0 ;
             res.render('./adminpart/adminsearchhirer',{getsearcheddocumentfrommongodb,hasAnyHirer,status}); 
          }
          else 
            console.log('Error in Retriving USER :' + JSON.stringify(err, undefined, 2)); 
        
       });
    
      };

      //ADMIN ALL EMPLOYEE SEARCH
      const AdminEmpSearchView = ( req, res ) => 
      {
        var r_email= req.body.emailid;
 
        console.log("INSIDE ADMIN SEARCH USER CONTROLLER  " + r_email);
  
        EmployeeInfo.find({"e_email": r_email}, (err, getsearcheddocumentfrommongodb) => 
        {
           if (!err) 
           {
              status = true;
              hasAnyEmp = getsearcheddocumentfrommongodb.length > 0 ;
              res.render('./adminpart/adminsearchemp',{getsearcheddocumentfrommongodb,hasAnyEmp,status}); 
           }
           else 
             console.log('Error in Retriving USER :' + JSON.stringify(err, undefined, 2)); 
         
        });
     
       };

//ADMIN DELETE HIRER
const AdminHirerDelete = ( req, res ) => 
      {
        var h_email = req.body.h_d_email;
 
        console.log("INSIDE ADMIN DELETE USER CONTROLLER  " + h_email);
  
        HirerInfo.findOneAndRemove({"h_email": h_email}, (err, deleteddocument) => 
        {
           if (!err) 
           {
            res.redirect('/admin/adminviewallhirer');
           }
           else 
             console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); 
         
        });
       };

//ADMIN DELETE EMPLOYEE
       const AdminEmployeeDelete = ( req, res ) => 
       {
         var e_email = req.body.e_d_email;
  
         console.log("INSIDE ADMIN DELETE USER CONTROLLER  " + e_email);
   
         EmployeeInfo.findOneAndRemove({"e_email": e_email}, (err, deleteddocument) => 
         {
            if (!err) 
            {
             res.redirect('/admin/adminviewallemployee');
            }
            else 
              console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); 
          
         });
      
        };
 
  
  
module.exports = {AdminLoginCheck , AdminAllHirerView , AdminAllEmployeeView , AdminEmpSearchView , AdminHirerSearchView ,AdminEmployeeDelete , AdminHirerDelete};