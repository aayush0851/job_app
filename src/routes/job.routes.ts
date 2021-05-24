import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addJob, listAppliedCandidates } from "../controller/job.controller";
import { addApplication } from "../controller/application.controller";

export const jobRouter = express.Router();

jobRouter.post("/", [authMiddleware], addJob);
jobRouter.post("/:job_id/application", [authMiddleware], addApplication);
jobRouter.get("/:job_id/candidates", [authMiddleware], listAppliedCandidates);