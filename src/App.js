const express=require("express");

const app=express();

const PORT=5555;

// Advanced Routing Techniques...
// Now this will match to /abc , /ac
app.get("/ab?c",(req,res)=>{
    // Here ? indicates that now b is optional here.
    res.send({"firstname":"Dibyansh","lastname":"Sharma"})
})

// Now this will match to /abc,/abbbbc,/abbbbbbbbbbbbc
app.get("/ab+c",(req,res)=>{
    // Here + means that you can add any number of b's in between a and c
    res.send("Hello from the Server")
})
// Now this will match to /abcd, /abflycd, /abshbdshdcd , /abDibyanshSharmacd
app.get("ab*cd",(req,res)=>{
    // Here * means that you can write anything between ab and cd the route will works properly.
    res.send("Hey I am up!")
})

// NOw this will match to /abcd,/ad
app.get("/a(bc)?d",(req,res)=>{
    // Here ? means that now bc is optional....
    res.send("Hello there...")
})

// Now this will match to /abcd ,/abcbcbcbcbcbcd
app.get("/a(bc)+d",(req,res)=>{
    // Here + means that we can add any number bc's in between a and d the route will works properly
    res.send("Hello from the Server...")
})

// Now this will match to /abcd ,/adragonflycd ,/aDibyanshSharmad
app.get("/a(bc)*d",(req,res)=>{
    // Here * means that you can write anything between ab and cd the route will works properly.
    res.send("Hello from the Server...")
})

// Now instead of writing String as an path we can also write REGEx over here as shown below:

app.get(/a/,(req,res)=>{

      // Here this will match to /a,/cab,/car
     res.send("Hello I am Up...")
})

app.get(/.*fly$/,(req,res)=>{
    // Here * means Route can contains anything in Starting but if it ends with fly then this will works properly...
      // Now this will match to routes like these: /dragonfly,/butterfly,/fly
    res.send("Hello from the Server, I hope you are enjoyinh Express...")

 })

 // How can we get our Query params in our Route Handler.

 // http://localhost:5555/user?userId=101&Password="DevTinder"
 app.get("/user",(req,res)=>{
    console.log(req.query) // Here this req.query will give us the information about our Query parameters...
    res.send("Request Handled Successfully...")
 })

 //Now suppose that if we have to make our Routes Dynamic:

 http://localhost:5555/user/101/Dibyansh Sharma/DevTinder
  app.get("/user/:userId/:name/:password",(req,res)=>{
    //Here in the path : means that it is a Dynamic Route
    console.log(req.params);
    res.send("Response sent Successfully...")
  })
app.listen(PORT,(req,res)=>{
    console.log(`Server is Successfully listening on PORT ${PORT}`);
})