import express from "express";
import { candidateRouter } from "./candidate.routes";
import { homeRouter } from "./home.routes";
import { recruiterRouter } from "./recruiter.routes";

export const baseRouter = express.Router();

baseRouter.use("/home", homeRouter);
baseRouter.use("/recruiters", recruiterRouter);
baseRouter.use("/candidates", candidateRouter);