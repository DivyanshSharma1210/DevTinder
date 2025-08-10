const express=require("express");
const User=require("../models/user.js");
const {userAuth}=require("../middlewares/userAuth.js");
const ConnectionRequest=require("../models/connectionRequest.js")

const requestRouter=express.Router();

// Sending a Connection request

requestRouter.post("/request/send/:status/:touserId",userAuth,async(req,res)=>{

   try{
       const fromUserId=req.user._id;
       const toUserId=req.params.touserId;
       const status=req.params.status;

       const allowedStatus=["ignored","interested"];

       if(!allowedStatus.includes(status))
       {
          return res.status(400).json({message:"Invalid Status Type : "+status });
       }
       
    //    if(fromUserId===toUserId)
    //    {
    //     return res.status(400).json({message:"You Cannot sent Connection Request to Yourself..."});
    //    }
       // If there is an existing Connection Request

        const existingConnectionRequest=await ConnectionRequest.findOne(
            {
                $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
            }
        );
        if(existingConnectionRequest)
        {
            return res.status(400).json({message:"Connection Request already Exists!!!"})
        }

        const toUser=await User.findById(toUserId);

        if(!toUser)
        {
            return res.status(400).json({message:"User not found..."});
        }
       const connectionRequest=new ConnectionRequest(
        {
            fromUserId,
            toUserId,
            status,
        }
       );

      const data = await  connectionRequest.save();

      res.json({
        message:req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
       
   }
   catch(err)
   {
    res.status(400).send("ERROR : "+err.message);
   }
});

// Reviewing the Connection Request

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{

    try{
          
        const status=req.params.status;
        const requestId=req.params.requestId;
        const loggedInUser=req.user;

        // Validate the Status

        const allowedStatus=["accepted","rejected"];

        if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"Status is not Allowed!!!"})
        }

        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        
        });

        if(!connectionRequest)
        {
            return res.status(400).json({message:"Connection Request not found..."})
        }
         
        connectionRequest.status=status;

         const data= await connectionRequest.save();

         res.status(200).json({
            message:"Connection Request : " + status,
            data:data
         })
  
    }
    catch(err)
    {
        res.status(400).send("Error : "+ err);
    }
});

module.exports=requestRouter;