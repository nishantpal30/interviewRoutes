import { StatusCodes } from "http-status-codes";
import { eligibleChecker } from "../../repositories/problem/eligibleChecker.js";
import { problemDeletionService } from "../../services/problem/problemDeletion.service.js";

export const deleteProblem = async (req, res) => {
  try {
    const eligibleCheck = await eligibleChecker(req.userId);
    if (!eligibleCheck.success) {
      return res.status(eligibleCheck.statusCode).json(eligibleCheck);
    }

    const response = await problemDeletionService(
      req.params?.slug,
      eligibleCheck.userId,
      eligibleCheck.isAdmin,
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("deleteProblem controller error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Unable to delete the problem.",
    });
  }
};
