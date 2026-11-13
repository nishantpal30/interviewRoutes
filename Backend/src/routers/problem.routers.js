import express from "express";
import isAuthenticated from "../middlewares/isauth.middlewares.js";

import { createProblem } from "../controllers/problem/createProblem.controller.js";
import { deleteProblem } from "../controllers/problem/deleteProblem.controller.js";
import { getAllProblems } from "../controllers/problem/getAllProblems.controller.js";

const problemRouter = express.Router();

problemRouter.get("/get-all-problems", getAllProblems);
problemRouter.post("/create-problem", isAuthenticated, createProblem);

problemRouter.patch(
  "/create-problem/update/:slug",
  isAuthenticated,
  createProblem,
);
problemRouter.delete("/delete-problem/:slug", isAuthenticated, deleteProblem);

export default problemRouter;
