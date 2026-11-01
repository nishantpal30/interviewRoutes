import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";

// Created once and reused for every email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
});

const isFullHtmlDocument = (html = "") => /^\s*<!doctype html/i.test(html);

export const emailNotificationSend = async ({
  email,
  intro,
  subject,
  emailContent,
  text,
}) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return {
        success: false,
        message:
          "Email service is not configured (EMAIL_USER / EMAIL_PASS missing)",
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }

    if (!email || !subject || !emailContent) {
      return {
        success: false,
        message: "email, subject and emailContent are required",
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }

    const html =
      intro && !isFullHtmlDocument(emailContent)
        ? `<p>${intro}</p>${emailContent}`
        : emailContent;

    const info = await transporter.sendMail({
      from:
        process.env.EMAIL_FROM ||
        `"InterviewRoute" <${process.env.EMAIL_USER}>`,
      replyTo: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });

    // Nodemailer reports rejected recipients instead of throwing
    if (info.rejected && info.rejected.length > 0) {
      return {
        success: false,
        message: `Email rejected for: ${info.rejected.join(", ")}`,
        statusCode: StatusCodes.BAD_GATEWAY,
        data: null,
      };
    }

    return {
      success: true,
      message: `Email sent successfully to ${email}`,
      statusCode: StatusCodes.OK,
      data: { messageId: info.messageId, accepted: info.accepted },
    };
  } catch (err) {
    // Auth failure, network/timeouts, bad config, etc.
    return {
      success: false,
      message: err?.message || "Something went wrong while sending email",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
};
