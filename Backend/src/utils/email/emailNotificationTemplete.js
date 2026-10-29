import { emailBody,emailIntro,emailSubject } from "./emailTemplate.js";
import { emailNotificationSend } from "./emailNotificationSend.js";


export const emailNotificationTemplete = async ({email,purpose,otp})=>{
const intro = emailIntro(purpose);
const subject = emailSubject(purpose);
const emailContent = emailBody(purpose,{name:email,otp});
 return await emailNotificationSend({ email, intro, subject, emailContent });
}