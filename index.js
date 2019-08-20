const express = require("express");
const mongoose = require('mongoose')
let mongodb = require('./database');
var bodyParser = require('body-parser')


const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 8080;
var MyModel = mongoose.model('oqsapp', new mongoose.Schema({ title : String,quiz:Array,answers:Array }));

//get all users
app.get("/",   (req, res) => {

//var MyModel = mongoose.model('oqsapp', new mongoose.Schema({ title : String,quiz:Array,answers:Array }));

// Works
MyModel.find(function(error, result) { res.json(result); });




});

app.post("/add",(req,res) => {



     var title = req.params.title;
var data = new MyModel({ title: title, quiz:[],answers:[] });

data.save(function (err) {

 MyModel.find(function(error, result) { res.json(result); });

});


})

app.listen(port);
