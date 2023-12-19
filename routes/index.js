var express = require('express');
var router = express.Router();
const userModel = require("./users")
//usermodel.plugin(passportLocalMongoose);
var passport = require("passport");
var localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/profile",isLoggedIn,(req,res)=>{
  res.send("this is profile")
})

router.post("/register",function(req,res){
  var userdata=new userModel({
    username:req.body.username,
    password:req.body.password,
    secret:req.body.secret
  })
  userModel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{//this is used to authenticate the user and it is a middleware
  successRedirect:"/profile",//this is used to redirect to the profile page if the user is authenticated
  failureRedirect:"/login"//this is used to redirect to the home page if the user is not authenticated
}),function(req,res){

})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect("/")
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  else{
    res.redirect("/")
  }}
