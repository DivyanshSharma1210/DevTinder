const express=require("express");
const User=require("../models/user.js");
const {validateSignUpData}=require("../utils/validation.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");
const {userAuth}=require("../middlewares/userAuth.js");
const authRouter=express.Router();


authRouter.post("/signup",userAuth,async (req,res)=>{

    try{

    // Validation of the Data

     validateSignUpData(req);

     // Encrypt the Password and then store the Encrypted password into the database.
    
       let {password}=req.body;

       let passwordHash=await bcrypt.hash(password,10)
       console.log(passwordHash);
        
     const userObj={firstName,lastName,emailID,password}=req.body;
 
     // Now assign or replace your password to passwordHash that is going to store in the database.

          userObj.password=passwordHash;
      // Creating new instance of the User Model.
     const user=new User({
        firstName,
        lastName,
        emailID,
        password:passwordHash,
     });
        await user.save();
    res.send("User Created Successfully...");
    }
    catch(err){
        res.status(400).send("Error : "+err.message);
    }
});

// Login API
authRouter.post('/login',async(req,res)=>{

    try{

    //Extracting user's emailID and password from req.body.

    const {emailID,password}=req.body;

    //  console.log(req.body);
    if(!validator.isEmail(emailID))
    {
        throw new Error ("Please Enter Valid emailID...");
    }

    // Logic to validate user

    const user=await User.findOne({emailID:emailID});
    
    // console.log(user)
    if(!user)
    {
        throw new Error("Invalid Credentials...")
    }
     const isPasswordValid=await bcrypt.compare(password,user.password);
     if(isPasswordValid)
     {

        // Create a JWT Token
      const token=await jwt.sign({_id:user._id},"DEV@TINDER$790",{expiresIn:'1d'}); 
      console.log(token);

        // Add the JWT token inside cookie and send the response back to the user.

        res.cookie("token",token,{expires: new Date(Date.now() + 8 * 3600000)});
        res.status(200).send("Login Successfull");
     }
     else
     {
        throw new Error("Invalid Credentials...")
     }

    }
    catch(err){
        res.status(400).send("ERROR : "+err.message)
    }


});


// Logout

authRouter.post('/logout',async (req,res)=>{
    try{

        res.cookie("token",null,{
            expires:new Date(Date.now()),
        });

        res.send("Logout Successfull...");
    }
    catch(err)
    {
         res.status(400).send("Error " + err);
    }
});



module.exports=authRouter;