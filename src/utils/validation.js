const validator=require("validator")

const validateSignUpData=(req)=>{

    const {firstName,lastName,emailID,password}=req.body;

    if(!firstName)
    {
        throw new Error ("Please Enter Your firstName...");
    }
    else if(firstName.length<4 || firstName.length>50)
    {
        throw new Error("firstName should be between 4-50 characters");
    }
    else if(!lastName)
    {
        throw new Error("Please Enter Your lastName...");
    }
    else if(lastName.length<4 || lastName.length>50)
    {
        throw new Error("lastName should be between 4-50 characters");
    }
    else if(!emailID)
    {
        throw new Error("Please Enter Your EmailID...");
    }
    else if(!validator.isEmail(emailID))
    {
        throw new Error ("EmailID is not valid ! Please Enter Valid EmailID...");
    }
    else if(!password)
    {
        throw new Error("Please Enter Password...");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Please enter a Strong Password.");
    }
}

 const validateEditProfileData = (req)=>{

     const allowedEditFields=["firstName","lastName","age","gender","photoUrl","about","skills","password"]

     const isEditAllowed= Object.keys(req.body).every(field => allowedEditFields.includes(field));

     return isEditAllowed;

 }
module.exports={validateSignUpData,validateEditProfileData};