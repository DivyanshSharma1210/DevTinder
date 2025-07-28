const express=require("express");

const app=express();

const PORT=5555;

// Get all users.
//This will only match to Get method API calls to /user.
app.get("/user",(req,res)=>{
    res.send({firstname:"Dibyansh",lastname:"Sharma",age:22});
})
// Add a new user.
// This will only match to POST method API calls to /user.
app.post("/user",(req,res)=>{
    console.log("Saving Data to the Database...")
    res.send("Data Successfully Saved to the Database");
})
// Update the user.
// This will only match to PATCH method API calls to /user.
app.patch("/user",(req,res)=>{
    res.send("User Updated Successfully...")
})
// Delete the User.
// This will only match to DELETE method API calls to /user...
app.delete("/user",(req,res)=>{
    res.send("User Deleted Successfully...")
})
app.use('/hello/2',(req,res)=>{
    res.send("Abrakadabra")
})

app.use('/hello',(req,res)=>{
    res.send("Hello from  DevTinder")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the Server...");
})

app.use('/',(req,res)=>{
    res.send("Welcome to the Home Page of DevTinder");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})