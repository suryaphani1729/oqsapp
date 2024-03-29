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
var ObjectId = mongoose.Types.ObjectId;
var TestModel = mongoose.model('tests', new mongoose.Schema({ user_id : ObjectId,title:String,bits:Number, expires:Date, answers:Array }));
var ResultModel = mongoose.model('results', new mongoose.Schema({ test_id : ObjectId,user_id : ObjectId,marks:Number, submitted:Date }));




//login
app.post("/login",(req,res) => {

     var reqData = req.body;
     var username=reqData.username;
     var password = reqData.password;

 // var data = new UserModel({ username: username, password:password });

UserModel.findOne({ username: username, password:password }, function(err, user) {
   
     if(user)
          res.json({status:1,msg:"Login Successfull",data:user});
     else
          res.send({status:0,msg:"Login Failed, please register"});
});
});


//save test
app.post("/newtest",(req,res) => {

     var reqData = req.body;
     var user_id= reqData.user_id;
     var title = reqData.title;
     var bits = reqData.bits;
     var expires = reqData.expires;
     var answers = reqData.answers;
     

var data = new TestModel({ user_id:new ObjectId(user_id),title, bits, expires, answers });

data.save(function (err,result) {

 res.json(result); 

});
     
});
//get test by user id
app.post("/gettestbyuser",(req,res) => {

     var reqData = req.body;
     var user_id= reqData.user_id;
      TestModel.find({ user_id:new ObjectId(user_id) }, function(err, user) {
         res.json(user);
         
      });

     
});
//get results by test id
app.post("/getresultbytest",(req,res) => {

     var reqData = req.body;
     var test_id= reqData.test_id;
      ResultModel.find({ test_id:new ObjectId(test_id) }, function(err, user) {
         res.json(user);
         
      });

     
});
//save result
app.post("/saveresult",(req,res) => {

     var reqData = req.body;
     var user_id= reqData.user_id;
     var test_id = reqData.test_id;
     var marks = reqData.marks;
     var submitted = reqData.submitted;
     
     

var data = new ResultModel({ user_id:new ObjectId(user_id),test_id:new ObjectId(test_id),marks,submitted });

data.save(function (err,result) {

 res.json(result); 

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
