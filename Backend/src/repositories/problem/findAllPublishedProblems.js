import CreateProblemSubmission from "../../db/models/problem/CreateProblemSubmission.js";
import Problem from "../../db/models/problem/problem.js";

const LIST_FIELDS = "title slug difficulty topics accessLevel createdAt";

// Problems visible to learners: published and not soft-deleted.
export const findAllPublishedProblems = async () => {
  return Problem.find({
    isPublished: true,
    isDeleted: { $ne: true },
  })
    .select(LIST_FIELDS)
    .sort({ title: 1, _id: 1 })
    .lean();
};

// Problems created by one user (for creator / admin dashboards).
export const findProblemsByCreator = async (userId) => {
  return CreateProblemSubmission.find({
    submittedBy: userId,
    isDeleted: { $ne: true },
  })
    .select(
      "submissionType problemId reviewStatus reviewMessage createdAt " +
        "content.title content.slug content.difficulty content.topics content.accessLevel",
    )
    .sort({ createdAt: -1 })
    .lean();
};