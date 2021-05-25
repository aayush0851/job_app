import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addJob, listAppliedCandidates } from "../controller/job.controller";
import { addApplication } from "../controller/application.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { jobMiddleware } from "../middleware/job.middleware";

export const jobRouter = express.Router();

jobRouter.post("/", [authMiddleware, recruiterMiddleware], addJob);
jobRouter.get("/:job_id/candidates", [authMiddleware], listAppliedCandidates);