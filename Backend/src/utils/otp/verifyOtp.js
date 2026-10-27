import { verifyOtpInput } from "../../validators/emailValidator/verifyOtp.validator.js";
import { findUserDetails } from "../../repositories/email.repositories.js";
import { StatusCodes } from "http-status-codes";



export const verifyOtp = async ({normalEmail,emailOtp, purpose ,consume})=>{

    const inputVerify = verifyOtpInput(normalEmail,emailOtp,purpose);

    if(!inputVerify.success){
        return inputVerify;
    };
const userDetails = await findUserDetails({normalEmail,emailOtp, purpose ,consume});
 return{
    userDetails
 }

    
};