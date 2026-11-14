import mongoose from "mongoose";
import User from "../../db/models/user.js";
import { StatusCodes } from "http-status-codes";


export const eligibleChecker = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "role masterStatus creatorPartnerStatus"
    );

    if (!user) {
      return {
        success: false,
        message: "User not found.",
        statusCode: StatusCodes.NOT_FOUND,
      };
    }

    const isAdmin = user.role === "admin";
    const isApprovedCreatorPartner =
      user.masterStatus === "master" &&
      user.creatorPartnerStatus === "approved";

    if (!isAdmin && !isApprovedCreatorPartner) {
      return {
        success: false,
        message: "You are not eligible to submit problems.",
        statusCode: StatusCodes.FORBIDDEN,
      };
    }

    return {
      success: true,
      userId :user._id,
      isAdmin,
      message: "User is eligible for problem creation and updation!!",
      statusCode: StatusCodes.OK,
    };
  } catch (error) {
    console.error("eligibleChecker error:", error);

    // Invalid ObjectId 
    if (error instanceof mongoose.Error.CastError) {
      return {
        success: false,
        message: `Invalid ${error.path}: ${error.value}`,
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    // Schema validation failed
    if (error instanceof mongoose.Error.ValidationError) {
      return {
        success: false,
        message: Object.values(error.errors)
          .map((e) => e.message)
          .join(", "),
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }

    // Database connection / server selection problems
    if (
      error instanceof mongoose.Error.MongooseServerSelectionError ||
      error.name === "MongoNetworkError"
    ) {
      return {
        success: false,
        message: "Database is unavailable. Please try again later.",
        statusCode: StatusCodes.SERVICE_UNAVAILABLE,
      };
    }

    // Anything else
    return {
      success: false,
      message: "Something went wrong while checking eligibility.",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};