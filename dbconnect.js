
// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

// Database Connection URL
var url = 'mongodb://localhost:27017/appprojectdb';

// STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
// err is callback function Parameter. LAMBDA EXPRESSION IS USED.
// JSON.stringify convert Object to String. 2 means Indentation of Two space Character 
mongoose.connect(url,{ useNewUrlParser: true }, 
    (err) => 
    {
       if (!err)
          console.log('NODEJS TO MongoDB Connection ESTABLISHeddddd.....');
       else
          console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    });

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose;