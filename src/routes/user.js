const express=require("express");
const User=require("../models/user");
const {userAuth}=require("../middlewares/userAuth.js");
const ConnectionRequest=require("../models/connectionRequest.js")

const userRouter=express.Router();

// Get user by emailID

userRouter.get("/user",userAuth,async(req,res)=>{

    const userEmail=req.body.emailID;

    try{
       const fetchedUser= await User.findOne({emailID:userEmail});
       if(!fetchedUser)
       {
        res.status(404).send("User not found...");
       }
       else
       res.send(fetchedUser);
    }
    catch(err)
    {
        res.status(400).send("Something Went Wrong...");
    }
});

// Delete an user

userRouter.delete("/user",userAuth,async(req,res)=>{

    const userId=req.body.userId;
    try{
         const deletedUser=  await User.findByIdAndDelete({_id:userId})
         res.send("User deleted Successfully...")
    }
    catch(err)
    {
        res.status(400).send("Something went wrong...")
    }
     
});

// Update an existing user

userRouter.patch("/user/:userId",userAuth,async(req,res)=>{

    const userId=req.params?.userId;
    const data=req.body;

      try{
        const allowedUpdates=["photoUrl","about","gender","age","skills","password"];

    const isUpdateAllowed= Object.keys(data).every((k)=>{
        return  allowedUpdates.includes(k);
      });
    if(!isUpdateAllowed)
    {
       throw new Error("Update not Allowed.");
    }
    if(data?.skills.length>10)
    {
        throw new Error("Skills cannot be more than 10.")
    }
        const user=  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:'before',runValidators:true});
        console.log(user);
        res.send("User Updated Successfully...")
      }
      catch(err)
      {
            res.status(400).send("UPDATE FAILED :"+err.message)
      }
});

// Get all the pending connection request for the loggedInUser
userRouter.get('/user/requests/received',userAuth,async (req,res)=>
{
    try{
        
        // extracting the loggedInUser
        const loggedInUser=req.user;

        let pendingConnectionRequests=await ConnectionRequest.find(
            {
                toUserId:loggedInUser._id,
                status:"intersted" 
            }
        ).populate("fromUserId",["firstName","lastName","photoUrl","age","skills"]);
        
        res.status(200).json({message:`You have ${pendingConnectionRequests.length} pending Connection Requests...`,data:pendingConnectionRequests});
    }
    catch(err){
         
        res.status(400).json({error:err})
    }
});

// Get all the Connections of the loggedInUser.

userRouter.get('/user/connections',userAuth,async (req,res)=>{

    try{
        
        // Extracting the loggedInUser

        const loggedInUser=req.user;

        const loggedInUserConnections=await ConnectionRequest.find({
              
            $or:
            [
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ],
           
        }).populate("fromUserId","firstName lastName age skills photoUrl").populate("toUserId","firstName lastName age photoUrl skills ");

        const data=loggedInUserConnections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
            {
                 return row.toUserId;
            }
            return  row.fromUserId;
        });
        if(loggedInUserConnections.length<0)
        {
            return res.status(400).send(`You have ${data.length} Connections`)
        }

        res.status(200).json({
            message:`You have ${data.length} Connections`,
            data:data
        })
    }
    catch(err)
    {
        res.status(400).send("Error : ",err)
    }
});
module.exports=userRouter;