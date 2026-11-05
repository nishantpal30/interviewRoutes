import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name :{
    type:String,
    required:true,
    trim:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true
   },
   password:{
    type:String,
    required:true,
    select:false,
    minlength:8
   },
   collegeName:{
    type:String,
    trim:true,
    lowercase:true
   },
   degreeName:{
    type:String,
    enum:["UG","PG"],
    default:"UG",

   },
   gradutionYear:{
    type:Number
   },
   numberOfProblemSolved:{
    type:Number
   },
   bio:{
    type:String,
   },
   profilePicture:{
    type:String,
    default:"user-default-profile.png"
   }
})

const User = mongoose.model("User",userSchema);
export default User;
