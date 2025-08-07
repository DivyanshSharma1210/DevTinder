const express=require("express");
const User=require("../models/user.js");
const {userAuth}=require("../middlewares/userAuth.js")

const requestRouter=express.Router();

// Sending a Connection request

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{

    // Logic to Send a Connection request

    const user=req.user;
    console.log("Sending a Connection Request...");

    res.send(user.firstName+" Sent the Connection Request...");
})


module.exports=requestRouter;