import { userRegister_service } from "../services/user.register.service.js";

export const userRegister = async (req, res) => {
  const { userDetails } = req.body;
  const userRegister_Response = await userRegister_service(userDetails);
  return res
    .status(userRegister_Response.statusCode)
    .json(userRegister_Response);
};

export const userRegisterOtp = async (req , res)=>{
    const {email} = req.body;
    const userRegisterOtp_Response = await userRegisterOtp_Service(email)
}
