import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addJob, listAppliedCandidates } from "../controller/job.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";

export const jobRouter = express.Router();

jobRouter.post("/", [authMiddleware, recruiterMiddleware], addJob);
jobRouter.get("/:job_id/list-candidates", [authMiddleware], listAppliedCandidates);