import express, {Response} from "express";
import { logout } from "../controller/home.controller";
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
baseRouter.get("/", (res: Response) => {
    res.status(200).json({
        message: "job-app-aayush0851 is now online"
    })
});