import { emailBody, emailSubject, emailText } from "./emailTemplate.js";
import { emailNotificationSend } from "./emailNotificationSend.js";

export const emailNotificationTemplete = async ({
  email,
  purpose,
  otp,
  name = "",
}) => {
  const subject = emailSubject(purpose);
  const emailContent = emailBody(purpose, { name, otp });
  const text = emailText(purpose, { otp });

  return await emailNotificationSend({ email, subject, emailContent, text });
};
