const express = require('express');
const exphbs = require('express-handlebars');

var path = require('path');

var indexRouter = require('./routes/index');
var expressValidator =require('express-validator');

var expressSession =require('express-session');

var dateTime = require('node-datetime');
var dt = dateTime.create();
dt.format('m/d/Y');
console.log(new Date(dt.now()));

const app =express();
var mongoose =require('./dbconnect');

app.engine('.hbs' , exphbs({defaultLayout:'main',extname:'.hbs'}));

app.set('view engine','.hbs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(expressValidator());
app.use(expressSession({secret:'max',saveUninitialized: false,resave: false}));

app.use('/', indexRouter);

app.listen(3000, () => {
 console.log('Example app is running → PORT 3000');
});

module.exports = app;