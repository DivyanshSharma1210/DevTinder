const express=require("express");
const {connectDB}=require('./config/database.js');
const User=require("./models/user.js");
const app=express();

const PORT=5555;

// Middleware to convert incoming JSON to JS Object.
app.use(express.json())

connectDB().then(()=>{

    console.log("Database Connected Successfully...")
    app.listen(PORT,(req,res)=>{
        console.log(`Server is Successfully listening on PORT ${PORT}`);
    });
}).catch(err=>{
       
   console.error("Database Cannot be connected!!");
});
//  Feed API => GET /feed => Fetch all users from the Database

app.get("/feed",async(req,res)=>{

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

// Get user by emailID

app.get("/user",async(req,res)=>{

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
app.post("/signup",async (req,res)=>{
     
    console.log(req.body);
    const userObj={firstName,lastName,age,gender,emailID,password}=req.body;

     // Creating new instance of the User Model.
    const user=new User(userObj);

    try{
        await user.save();
    res.send("User Created Successfully...");
    }
    catch(err){
        res.status(400).send("Error Saving the User :"+err.message);
    }
});

// Update an existing user

app.patch("/user/:userId",async(req,res)=>{

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

app.delete("/user",async(req,res)=>{

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