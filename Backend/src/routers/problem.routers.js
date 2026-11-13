import express from "express";
import isAuthenticated from "../middlewares/isauth.middlewares.js";

import { createProblem } from "../controllers/problem/createProblem.controller.js";

const problemRouter = express.Router();

problemRouter.post("/create-problem", isAuthenticated, createProblem);

export default problemRouter;
