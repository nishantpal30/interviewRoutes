import { normalizedEmail } from "../utils/extra/normailemail.js";
import { loginInputValidation } from "../validators/userValidator/loginInput.validator.js";
import { loginUserChecker } from "../repositories/login.repositories.js";
import { getMe } from "../repositories/login.repositories.js";
import { StatusCodes } from "http-status-codes";
export const loginService = async ({email,password})=>{
    const details ={email,password}
    const inputValidation = loginInputValidation(details);
    if(!inputValidation){
        return inputValidation
    }
const normalEmail = normalizedEmail(email)
    return await loginUserChecker({email:normalEmail,password});
}

export const getMeService = async (userId)=>{
    const profile = await getMe(userId);
    if(!profile){
        return{success:false,
        message:"You need to login first",
    statusCode:StatusCodes.BAD_REQUEST}
        
    }
    return{
        success:true,
        message:"Details fetch successfully!!",
        statusCode:StatusCodes.OK,
        profile
    }
}