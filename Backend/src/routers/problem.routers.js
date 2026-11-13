import express from "express";
import isAuthenticated from "../middlewares/isauth.middlewares.js";

import {
  createProblem,
  createrAllProblem,
} from "../controllers/problem/createProblem.controller.js";

const problemRouter = express.Router();


// poblem created
problemRouter.post("/create-problem", isAuthenticated, createProblem);

// problem updated
problemRouter.patch("/create-problem/update/:slug",isAuthenticated,createProblem);


// problem read for creater dashboard
problemRouter.get("/my-problem", isAuthenticated, createrAllProblem);


problemRouter.delete("/delete-problem/:slug", isAuthenticated, deleteProblem);

export default problemRouter;
