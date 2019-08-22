const express = require("express");
const mongoose = require('mongoose')
let mongodb = require('./database');
var bodyParser = require('body-parser')
var cors = require('cors')




const app = express();

app.use(cors())
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 8080;
var MyModel = mongoose.model('oqsapp', new mongoose.Schema({ title : String,quiz:Array,answers:Array }));
var UserModel = mongoose.model('oqsusers', new mongoose.Schema({ username : String,password:String }));

//login
app.post("/login",(req,res) => {

     var reqData = req.body;
     var username=reqData.username;
     var password = reqData.password;

 // var data = new UserModel({ username: username, password:password });

UserModel.findOne({ username: username, password:password }, function(err, user) {
   
     if(user)
          res.json({status:1,msg:"Login Successfull"});
     else
          res.send({status:0,msg:"Login Failed, please register"});
});
});
//login
app.post("/register",(req,res) => {

     var reqData = req.body;
     var username=reqData.username;
     var password = reqData.password;

  var data = new UserModel({ username: username, password:password });

UserModel.findOne({ username: username, password:password }, function(err, user) {
   
     if(user)
          res.json({status:0,msg:"Already Registered"});
     else{
          
          data.save(function (err) {
               if(err)  res.json({status:0,msg:"Something went wrong"});
                res.json({status:1,msg:"Registered Successfull"});
          });
     }
});
});




//get All quizes
app.get("/",   (req, res) => {

// Works
MyModel.find(function(error, result) { res.json(result); });

});
//save quiz
app.post("/add",(req,res) => {

     var reqData = req.body;
     var title=reqData.title;
     var quiz = reqData.quiz;
     var answers = reqData.answers;


var data = new MyModel({ title: title, quiz:quiz,answers:answers });

data.save(function (err) {

 MyModel.find(function(error, result) { res.json(result); });

});


})

app.listen(port);
