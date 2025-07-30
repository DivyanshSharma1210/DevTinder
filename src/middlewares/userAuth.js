const userAuth=(req,res,next)=>{
    console.log("User Auth is Getting Checked...")

    const token ="abcd";
    const isUserAuthorized=token==="abcd";

    if(isUserAuthorized)
        {
            next();
        }
        else
        {
              res.status(401).send("User is not Authorized...")
        }
}

module.exports={userAuth};