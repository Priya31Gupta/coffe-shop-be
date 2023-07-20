
const express = require("express");
const cors = require('cors');
const connect = require("../configs/db.js");
const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dtzzxe28w', 
  api_key: '971629164699119', 
  api_secret: process.env.CLOUDINARY_KEY 
});
const uploadImage = require('../configs/uploadImage.js')
const passport = require('../configs/passport');
const ProductController = require('./Controller/product.controller.js');
const UserController = require('./Controller/user.controller.js')
const CartController = require('./Controller/cart.controller.js')

 const app = express();
 app.use(cors());

 app.use(express.urlencoded({ extended: false }));

 app.use(express.json());

const {signin,signup,newToken} =require("./Controller/auth.controller.js");

 app.use(passport.initialize());
 app.use(cors());

passport.serializeUser(function({user,token},done){
    done(null,{user,token})
})

passport.deserializeUser(function({user,token},done){
    done(err,{user,token})
})


app.get("auth/google/failure",function(req,res){
    return res.send("Something went wrong")
})

app.get("/auth/google/success", async function(req,res){
    let user=await admin.findOne().lean().exec();
    console.log(profile);
    let token= newToken(user)
    return res.send({user,token})
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
     ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
           successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}),function (req,res){
    console.log("user",req.user);
    let user= req.user;
  
  return res.send(user)
});


app.post("/signup",signup);
app.post("/signin",signin);
app.use('/products',ProductController);
app.use('/user',UserController);
app.use('/cart',CartController);

app.listen(process.env.PORT||4000,async ()=>{
  let data= await  connect();
    console.log("listening on port 4000")
})
