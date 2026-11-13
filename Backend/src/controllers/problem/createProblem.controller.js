import { StatusCodes } from "http-status-codes";
import { eligibleChecker } from "../../repositories/problem/eligibleChecker.js";
import { problemCreationService } from "../../services/problem/problemCreation.service.js";

export const createProblem = async (req, res) => {
  try {
    const eligibleCheck = await eligibleChecker(req.userId);
    if (!eligibleCheck.success) {
      return res.status(eligibleCheck.statusCode).json(eligibleCheck);
    }

    const isUpdate = req.params?.slug !== undefined;
    const submissionType = isUpdate ? "update" : "create";
    const problemSlug = isUpdate ? req.params.slug : null;
    const { content } = req.body ?? {};

    const response = await problemCreationService(
      submissionType,
      problemSlug,
      content,
      eligibleCheck.userId,
      eligibleCheck.isAdmin,
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error("createProblem controller error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Unable to submit the problem.",
    });
  }
};
