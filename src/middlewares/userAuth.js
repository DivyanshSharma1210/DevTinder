const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{

   try
   {
     // Read the Token from the req.cookies

     const cookies=req.cookies;

     // Extracting Token from the cookie
 
     const {token}=cookies;
     // Check whether the token is present or not
      if(!token)
      {
          throw new Error("Please Login Again...")
      }
 
      // Validate the Token
 
      const decodedObj=jwt.verify(token,"DEV@TINDER$790");
 
      // Find the user
      
      const {_id}=decodedObj;
 
      const user=await User.findById(_id);
 
      if(!user)
      {
         throw new Error("User not found...")
      }
       next();
   }
   catch(err)
   {
    res.status(400).send("Error : "+err.message);
   }
}

module.exports={userAuth};