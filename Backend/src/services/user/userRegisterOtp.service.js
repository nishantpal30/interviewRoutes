import { inputEmailverify } from "../../validators/emailValidator/verifyOtp.validator.ts";
import { otpGenerater } from "../../utils/otp/otpGenerater.js";
import { normalizedEmail } from "../../utils/extra/normailemail.js";


export const userRegisterOtp_Service = async (email)=>{
    const normalEmail = normalizedEmail(email)
    const emailchecked = inputEmailverify(normalEmail);
    if(emailchecked){
        return emailchecked
    };
  return await otpGenerater({ email: normalEmail, purpose: "register" });
}