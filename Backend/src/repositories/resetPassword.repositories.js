
import User from "../db/models/user.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { normalizedEmail } from "../utils/extra/normailemail.js";


export const restPasswordDb = async ({email})=>{
    const normalEmail = normalizedEmail(email)
    const user = await User.exists({email:normalEmail})
    if(!user){
        return{
            success:false,
            message:"User does not exist with this email!!",
            statusCode:StatusCodes.NOT_FOUND
        }
    }
return{
    success:true,
    message:"User exist",
    statusCode:StatusCodes.OK
}

}

export const newPassword = async({email,password})=>{
    const normalEmail = normalizedEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.findOneAndUpdate(
        {email:normalEmail},
        {$set:{password:hashedPassword}},
         { returnDocument: "after", runValidators: true }
    ).select("-password");

}
