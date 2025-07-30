const express=require("express");
const {adminAuth}=require("./middlewares/adminAuth");
const{userAuth}=require("./middlewares/userAuth")

const app=express();

const PORT=5555;

// Handle Auth Middleware for all Requests.
app.use("/admin",adminAuth) 

// Admin Routes
app.get("/admin/getAllData",(req,res)=>{

    res.send("All Data Sent Successfully...");
})

app.delete("/admin/deleteUser",(req,res)=>{
    
    res.send("User Deleted Successfully...")
})

// User Routes

// Handle Auth Middleware for all Requests

// app.use("/user",userAuth)
// Get user or Fetch user
app.get("/user",userAuth,(req,res)=>{

    res.send("User Fetched Successfully...")
})
// Add a user
app.post("/user",userAuth,(req,res)=>{

    res.send("User Added Successfully...")
})
// Update the user
app.patch("/user",userAuth,(req,res)=>{

    res.send("User Updated Successfully...")
})
// Delete a User
app.delete("/user",userAuth,(req,res)=>{

    res.send("User Deleted Successfully...")
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})