const express=require("express");

const app=express();

const PORT=5555;

app.use("/",(err,req,res,next)=>{
        
    if(err)
    {
        // Log Your Errors
        res.status(500).send("Something went Wrong");
    }

})
app.get('/getUserData',(req,res)=>{
     try{
     // Logic of DB call and get user data

     throw new Error("sdhfjhdsajkl");
     res.send("User Data Sent");
     }catch(err){
        res.status(500).send("Unexpected Error Occured Try Again After some Time");
     }

});

app.use("/",(err,req,res,next)=>{
        
    if(err)
    {
        // Log Your Errors
        res.status(500).send("Something went Wrong");
    }

})
app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})