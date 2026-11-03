import { restPasswordDb } from "../../repositories/resetPassword.repositories.js";
import { otpGenerater } from "../../utils/otp/otpGenerater.js";
import { verifyOtp } from "../../utils/otp/verifyOtp.js";
import { newPassword } from "../../repositories/resetPassword.repositories.js";
import { success } from "zod";
import { StatusCodes } from "http-status-codes";

export const resetPasswordService = async (email) => {
  const result = await restPasswordDb({email});
  if (!result) {
    return result;
  }
  return await otpGenerater({ email: email, purpose: "resetPassword" });
};


export const passwordUpdatingService = async ({email,emailOtp,password})=>{
const checkotp = await verifyOtp({email,emailOtp,purpose:"resetPassword",consume:true})
if(!checkotp){
    return checkotp
}
  const result =await newPassword({email,password});
  return {
    result,
    success:true,
    message:"Reset Password success!!",
    statusCode:StatusCodes.CREATED
  }
}