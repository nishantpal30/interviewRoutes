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
  return Problem.find({
    createdBy: userId,
    isDeleted: { $ne: true },
  })
    .select(`${LIST_FIELDS} isPublished`)
    .sort({ title: 1, _id: 1 })
    .lean();
};
