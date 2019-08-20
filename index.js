const express = require("express");
const mongoose = require('mongoose')
let mongodb = require('./database');

const app = express();

app.use(express.json({ extended: false }));
const port = process.env.PORT || 8080;

//get all users
app.get("/",  async(req, res) => {

var MyModel = mongoose.model('oqsapp', new Schema({ title : String,quiz:Array,answers:Array }));

// Works
await MyModel.findOne(function(error, result) { res.json(result); });




});

app.listen(port);
