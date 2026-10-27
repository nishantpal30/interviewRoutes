import { StatusCodes } from "http-status-codes";
import EmailOtp from "../db/models/emailOtp.js";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 5;
export const findUserDetails = async (normalEmail,emailOtp, purpose,consume) => {
  try {
    const details = await EmailOtp.findOne({ email: normalEmail, purpose});
    if(!details){
        return{
            success:false,
            message:"Otp is not generated on this email!!",
            statusCode:StatusCodes.NOT_FOUND
        }
    };
if(details.attempts>MAX_ATTEMPTS){
    return{
        success:false,
        message:"Too many attempts for verify OTP!!",
        statusCode:StatusCodes.CONFLICT
    }
};
const isMatch = await bcrypt.compare(String(emailOtp),details.codeHash);
if(!isMatch){
    details.attempts +=1;
    await details.save();
    return{
        success:false,
        message:"Inavlid OTP Coder Sahab ji !!",
        statusCode:StatusCodes.NOT_ACCEPTABLE
    }
}
if(consume){
    details.consumeAt = new Date();
    await details.save();
}
 return{
    success:true,
    message:"OTP verify successfully !!",
    statusCode:StatusCodes.OK
 }
    
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
      statusCode:StatusCodes.BAD_GATEWAY
    });
  }
};

