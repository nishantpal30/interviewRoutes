import Problem from "../../db/models/problem/problem.js";

// True if another live (not soft-deleted) problem already uses this slug.
// Pass excludeId when updating so a problem does not clash with itself.
export const slugTaken = async (slug, excludeId = null) => {
  const query = { slug, isDeleted: { $ne: true } };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  return Boolean(await Problem.exists(query));
};
