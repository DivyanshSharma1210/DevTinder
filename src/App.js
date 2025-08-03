const express=require("express");
const {connectDB}=require('./config/database.js');
const User=require("./models/user.js");
const {validateSignUpData}=require("./utils/validation.js");
const validator=require("validator");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/userAuth.js")
const app=express();

const PORT=5555;

// Middleware to convert incoming JSON to JS Object.
app.use(express.json());

// Middleware to parse cookies:
app.use(cookieParser()); 

connectDB().then(()=>{

    console.log("Database Connected Successfully...");
    app.listen(PORT,(req,res)=>{
        console.log(`Server is Successfully listening on PORT ${PORT}`);
    });
}).catch(err=>{
       
   console.error("Database Cannot be connected!!");
});
//  Feed API => GET /feed => Fetch all users from the Database

app.get("/feed",userAuth,async(req,res)=>{

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
// get Profile

app.get("/profile",userAuth,async(req,res)=>{

    try{
        const cookies=req.cookies;
    
    const {token}=cookies;

    //Check whether the Token is present or not
    if(!token)
    {
        throw new Error("Invalid Token...")
    }
    // Validate the Token

    const decodedMessage=await jwt.verify(token,"DEV@TINDER$790");

    const {_id}=decodedMessage;

    const user=await User.findById(_id);
    if(!user)
    {
        throw new Error("Please Login Again...");
    }
    res.status(200).send(user);
    }
    catch(err)
    {
        res.status(400).send("ERROR : "+err.message);
    }
})
// Get user by emailID

app.get("/user",userAuth,async(req,res)=>{

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
    



})
// Add a new user
app.post("/signup",userAuth,async (req,res)=>{

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
app.post('/login',userAuth,async(req,res)=>{

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
      const token=await jwt.sign({_id:user._id},"DEV@TINDER$790");
      console.log(token);

        // Add the JWT token inside cookie and send the response back to the user.

        res.cookie("token",token);
        res.status(200).send("Login Successfull")
     }
     else
     {
        throw new Error("Invalid Credentials...")
     }

    }
    catch(err){
        res.status(400).send("ERROR : "+err.message)
    }


})

// Update an existing user

app.patch("/user/:userId",userAuth,async(req,res)=>{

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

// Delete an user

app.delete("/user",userAuth,async(req,res)=>{

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