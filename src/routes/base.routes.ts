import express from "express";
import { logout, test } from "../controller/home.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { applicationRouter } from "./application.route";
import { candidateRouter } from "./candidate.routes";
import { homeRouter } from "./home.routes";
import { jobRouter } from "./job.routes";
import { recruiterRouter } from "./recruiter.routes";

export const baseRouter = express.Router();

baseRouter.use("/home", homeRouter);
baseRouter.use("/recruiters", recruiterRouter);
baseRouter.use("/candidates", candidateRouter);
baseRouter.use("/applications", applicationRouter);
baseRouter.use("/jobs", jobRouter);
baseRouter.post("/logout", [authMiddleware], logout)
baseRouter.get("/", test);