import Problem from "../../db/models/problem/problem.js";

export const findAllPublishedProblems = async () => {
  return Problem.find({
    isPublished: true,
    isDeleted: { $ne: true },
  })
    .select("title slug difficulty topics accessLevel createdAt")
    .sort({ title: 1, _id: 1 })
    .lean();
};
