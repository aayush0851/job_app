import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addApplication, deleteApplication, rejectOrAcceptCandidateApplication,  } from "../controller/application.controller";
import { recruiterMiddleware } from "../middleware/recruiter.middleware";
import { candidateMiddleware } from "../middleware/candidate.middleware";

export const applicationRouter = express.Router();

applicationRouter.post("/", [authMiddleware, candidateMiddleware], addApplication);

applicationRouter.put("/:application_id", 
    [authMiddleware, recruiterMiddleware], rejectOrAcceptCandidateApplication);

applicationRouter.delete("/:application_id", 
    [authMiddleware,candidateMiddleware], deleteApplication);