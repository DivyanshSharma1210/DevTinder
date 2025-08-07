const express=require("express");
const {connectDB}=require('./config/database.js');
const cookieParser=require("cookie-parser");
const app=express();

const PORT=5555;

// Middleware to convert incoming JSON to JS Object.
app.use(express.json());

// Middleware to parse cookies:
app.use(cookieParser()); 

// Now we have to import or require all our Routers...
const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const userRouter=require("./routes/user.js");
const requestRouter=require("./routes/request.js");  


// In order to use the above Routers we can use it like this :

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB().then(()=>{

    console.log("Database Connected Successfully...");
    app.listen(PORT,(req,res)=>{
        console.log(`Server is Successfully listening on PORT ${PORT}`);
    });
}).catch(err=>{
       
   console.error("Database Cannot be connected!!"); 
});