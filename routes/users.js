var express = require('express');
var router = express.Router();
var mongoose=require("mongoose")
const plm=require('passport-local-mongoose')
/* GET users listing. */

mongoose.connect("mongodb://127.0.0.1:27017/form")
const userschema=mongoose.Schema({
  username:String,
  password:String,
  secret:String
})


userschema.plugin(plm);//this is used to add the passport local mongoose to the schema and the model 
module.exports=mongoose.model("user",userschema)

