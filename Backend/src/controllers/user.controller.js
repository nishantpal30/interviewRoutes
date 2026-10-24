
import { userRegister_service } from "../services/user.register.service.js";

export const userRegister = (req , res)=>{
const {userDetails} = req.body;
const userRegister_Response = userRegister_service(userDetails);
}