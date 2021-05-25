import express from "express";
import { logout } from "../controller/home.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { candidateRouter } from "./candidate.routes";
import { homeRouter } from "./home.routes";
import { jobRouter } from "./job.routes";
import { recruiterRouter } from "./recruiter.routes";

export const baseRouter = express.Router();

baseRouter.use("/home", homeRouter);
baseRouter.use("/recruiters", recruiterRouter);
baseRouter.use("/candidates", candidateRouter);
baseRouter.use("/jobs", jobRouter);
baseRouter.post("/logout", [authMiddleware], logout)