import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name :{
    type:String,
    require:true,
    trim:true
   },
   email:{
    type:String,
    require:true,
    unique:true,
    trim:true,
    lowercase:true
   },
   password:{
    type:String,
    require:true,
    unique:true,
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
},{timeseries:true})

const User = mongoose.model("User",userSchema);
export default User;