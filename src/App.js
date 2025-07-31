const express=require("express");
const {connectDB}=require('./config/database.js');
const User=require("./models/user.js");
const app=express();

const PORT=5555;



connectDB().then(()=>{

    console.log("Database Connected Successfully...")
    app.listen(PORT,(req,res)=>{
        console.log(`Server is Successfully listening on PORT ${PORT}`);
    });
}).catch(err=>{
       
   console.error("Database Cannot be connected!!");
});

// Add a new User
app.post("/signup",async (req,res)=>{
     
    const userObj={
        firstName:"Gaurav",
        lastName:"Sharma",
        age:21,
        gender:"Male",
        emailID:"gaurav@gmail.com",
        password:"gaurav@123"
    };

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
