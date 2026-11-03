import { verifyOtpInput } from "../../validators/emailValidator/verifyOtp.validator.ts";
import { findUserDetails } from "../../repositories/email.repositories.js";




export const verifyOtp = async ({normalEmail,emailOtp, purpose ,consume})=>{
// console.log(normalEmail,emailOtp,purpose,consume)
const inputVerify = verifyOtpInput(normalEmail,emailOtp,purpose);
// console.log(inputVerify)
    if(inputVerify){
        return inputVerify;
    };
const data = await findUserDetails(normalEmail,emailOtp, purpose ,consume);
// console.log(data)
return data;

//  console.log(userDetails)

    
};