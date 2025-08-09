const express=require("express");
const User=require("../models/user.js");
const {userAuth}=require("../middlewares/userAuth.js");
const {validateEditProfileData}=require("../utils/validation.js")

const profileRouter=express.Router();

// get Profileview

profileRouter.get("/profile/view",userAuth,async(req,res)=>{

    try{
        // Extracting the user from request body...

        const user=req.user;
        res.status(200).send(user);
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }
});

//  Feed API => GET /feed => Fetch all users from the Database

profileRouter.get("/feed",userAuth,async(req,res)=>{

    try{
        const feed=await User.find({});
        if(feed.length===0)
        {
            res.send(404).send("Users not found");
        }
        else{
            
            res.send(feed);
        }
    
    }
    catch(err)
    {
        res.status(400).send("Something went wrong...");
    }
    
})

// profile/edit

profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{

    try{
            // Logic for editing profile
           
          if(!validateEditProfileData(req))
          {
            throw new Error("Invalid Edit Request");
          }
            
        const loggedInUser=req.user;

        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);

       await  loggedInUser.save(); // Saving the Updated profile of loggedInUser in our Database...

        res.json({ message :` ${loggedInUser.firstName} , Your Profile is Updated Successfully...`,
        data:loggedInUser
    });
    }
    catch(err)
    {
        res.status(400).send("Error : "+err);
    }
})



module.exports=profileRouter;