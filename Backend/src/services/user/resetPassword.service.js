import { restPasswordDb } from "../../repositories/resetPassword.repositories.js";
import { otpGenerater } from "../../utils/otp/otpGenerater.js";
import { verifyOtp } from "../../utils/otp/verifyOtp.js";
import { newPassword } from "../../repositories/resetPassword.repositories.js";
import { StatusCodes } from "http-status-codes";
import { normalizedEmail } from "../../utils/extra/normailemail.js";

export const resetPasswordService = async (email) => {
  const normalEmail = normalizedEmail(email);
  const result = await restPasswordDb({ email: normalEmail });
  if (!result.success) {
    return result;
  }
  return await otpGenerater({ email: normalEmail, purpose: "resetPassword" });
};


export const passwordUpdatingService = async ({email,emailOtp,password})=>{
  const normalEmail = normalizedEmail(email);
  const checkotp = await verifyOtp({
    normalEmail,
    emailOtp,
    purpose: "resetPassword",
    consume: true,
  });
  if (!checkotp.success) {
    return checkotp;
  }

  const result = await newPassword({ email: normalEmail, password });
  if (!result) {
    return {
      success: false,
      message: "User does not exist with this email",
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    result,
    success:true,
    message:"Reset Password success!!",
    statusCode:StatusCodes.OK
  }
}
