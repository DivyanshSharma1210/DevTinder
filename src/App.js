const express=require("express");

const app=express();

const PORT=5555;

// app.use("/route",[rh1,rh2],rh3,rh4,rh5)
app.use('/user',[(req,res,next)=>{
    // Route handler 
    console.log("Handling the Route user...");
    // res.send("1st Response...");
    next()
},
(req,res,next)=>{
      // Route Handler 2
     console.log("Handling the Route user 2...");
    //  res.send("2nd Response...");
    next();

}],
(req,res,next)=>{
    // Route Handler 3
    console.log("Handling the Route user 3...");
    // res.send("3rd Response...");
    next()
},
(req,res,next)=>{
    // Route Handler 4
    console.log("Handing the Route User 4...");
    // res.send("4th Response...");
    next()
},
(req,res,next)=>{
    // Route Handler 5
    console.log("Handling the Route User 5...");
    res.send("5th Response...");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})