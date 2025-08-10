const mongoose=require("mongoose");


const connectionRequestSchema=new mongoose.Schema({

    fromUserId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // refernce to the user collection...
        required:true,
        index:true
    },
    toUserId:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",   // reference to the User Collection
      required:true,
      index:true
    },
    status:
    {
       type:String,
       enum:{
         values:["ignored","interested","accepted","rejected"],
         message:`{Value} is incorrect Status Type`
       },
       required:true
}
},{timestamps:true});

// Compund Index...
connectionRequestSchema.index({fromUserId:1 , toUserId:1})// Here 1 represents Ascending Order and -1 represents Descending Order

connectionRequestSchema.pre("save",function(next)
{
       const connectionRequest=this;

       // Check if the fromUserId is equal to toUserId or whether the user is trying to sent the Connection Request to ourself...

       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
       {
         throw new Error("Cannot Sent Connection Request to Yourself...")
       }
       next();
});

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);


module.exports=ConnectionRequestModel;