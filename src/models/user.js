const mongoose=require("mongoose");
const validator=require("validator")

const userSchema=mongoose.Schema({

    firstName:{

        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        min:18,
    },
    gender:{
        type:String,
        required:true,
        validate(value)
        {
            if(!["male","female","others"].includes(value))
            {
                   throw new Error("Gender is not Valid.")
            }

        }
    },
    emailID:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email ID  :"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value)
        {
            if(!validator.isStrongPassword(value))
            {
                throw new Error ("Enter a Strong Password...")
            }
        }
    },
    photoUrl:
    {
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s",

        validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error ("Invalid Photo Url : "+value);
            }
        }
    },
    about:
    {
        type:String,
        default:"This is a Default Description of the User!"

    },
    skills:
    {
        type:[String],

    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);

module.exports=User;