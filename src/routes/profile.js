const express=require("express");
const User=require("../models/user.js");
const {userAuth}=require("../middlewares/userAuth.js")

const profileRouter=express.Router();

// get Profile

profileRouter.get("/profile",userAuth,async(req,res)=>{

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



module.exports=profileRouter;