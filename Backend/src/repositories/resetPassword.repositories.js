
import User from "../db/models/user.js";
import { StatusCodes } from "http-status-codes";
import { normalizedEmail } from "../utils/extra/normailemail.js";


export const restPasswordDb = async ({email})=>{
    const normalEmail = normalizedEmail({email})
    const user = await User.findOne({email:normalEmail})
    if(!user){
        return{
            success:false,
            message:"User does not exist with this email!!",
            statusCode:StatusCodes.BAD_REQUEST
        }
    }
return{
    user,
    success:true,
    message:"User exist",
    statusCode:StatusCodes.OK
}

}

export const newPassword = async({email,password})=>{
    return await User.findOneAndUpdate(
        {email:email},
        {$set:{password:password}},
         { returnDocument: "after", runValidators: true }
    ).select("-password");

}