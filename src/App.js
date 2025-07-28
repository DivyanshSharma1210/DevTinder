const express=require("express");

const app=express();

const PORT=5555;

app.use('/',(req,res)=>{
    res.send("Welcome to the Home Page of DevTinder");
})

app.use('/hello',(req,res)=>{
    res.send("Hello from  DevTinder")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the Server...");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})