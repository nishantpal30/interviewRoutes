import EmailOtp from "../db/models/emailOtp.js";


export const  otpSave_DB = async({email,purpose,otpCodeHash,otpExpriesAt})=>{
await EmailOtp.deleteMany({email,purpose,consumeAt:null});
await EmailOtp.create({
    email,purpose,otpCodeHash:otpCodeHash,expiresAt:otpExpriesAt
});

}