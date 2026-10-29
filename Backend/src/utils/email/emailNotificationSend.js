import { StatusCodes } from "http-status-codes";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailNotificationSend = async ({
  email,
  intro,
  subject,
  emailContent,
}) => {
  try {
    const html = intro ? `<p>${intro}</p>${emailContent}` : emailContent;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "InterviewRoute <onboarding@resend.dev>",
      to: email,
      subject,
      html,
    });

    // Resend returns { error } instead of throwing — handle it explicitly
    if (error) {
      return {
        success: false,
        message: `Resend failed: ${error.message}`,
        statusCode: StatusCodes.BAD_GATEWAY, // upstream service failed
        data: null,
      };
    }

    // Success
    return {
      success: true,
      message: `Email sent successfully to ${email}`,
      statusCode: StatusCodes.OK,
      data,
    };
  } catch (err) {
    // Catch anything unexpected (network, bad API key, JSON parse, etc.)
    return {
      success: false,
      message: err?.message || "Something went wrong while sending email",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
};
