import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { softDeleteProblem } from "../../repositories/problem/softDeleteProblem.js";

export const problemDeletionService = async (problemSlug, userId, isAdmin) => {
  if (!isAdmin) {
    return {
      success: false,
      statusCode: StatusCodes.FORBIDDEN,
      message: "Only admins can delete problems.",
    };
  }

  if (typeof problemSlug !== "string" || problemSlug.trim().length === 0) {
    return {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Problem slug is required.",
    };
  }

  try {
    const deletedProblem = await softDeleteProblem(problemSlug.trim(), userId);

    if (!deletedProblem) {
      return {
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Problem not found or it has already been deleted.",
      };
    }

    return {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Problem deleted successfully.",
      problem: deletedProblem,
    };
  } catch (error) {
    console.error("Problem deletion service error:", error);

    if (
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError
    ) {
      return {
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message,
      };
    }

    if (
      error instanceof mongoose.Error.MongooseServerSelectionError ||
      error.name === "MongoNetworkError"
    ) {
      return {
        success: false,
        statusCode: StatusCodes.SERVICE_UNAVAILABLE,
        message: "Database is unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to delete the problem.",
    };
  }
};
