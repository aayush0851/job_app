import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addApplication, rejectOrAcceptCandidateApplication,  } from "../controller/application.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { jobMiddleware } from "../middleware/job.middleware";
import { candidateMiddleware } from "../middleware/candidate.middleware";
import { applicationMiddleware } from "../middleware/application.middleware";

export const applicationRouter = express.Router();

applicationRouter.post("/", [authMiddleware, candidateMiddleware], addApplication);

applicationRouter.put("/:application_id", 
    [authMiddleware, recruiterMiddleware, jobMiddleware], rejectOrAcceptCandidateApplication);

applicationRouter.delete("/:application_id", 
    [authMiddleware,candidateMiddleware, applicationMiddleware],)