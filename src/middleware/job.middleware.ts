import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../enum/user.enum";
import { applicationService } from "../services/entities/application.service";
import { jobService } from "../services/entities/job.service";
import { HttpException } from "../utils/exception";
import { baseMiddleware } from "./base.middleware";

export const jobMiddleware = baseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    // let jobId = req.params.job_id;
    // if(!jobId) {
    //     const application = await applicationService.get(req.params.application_id);
    //     if(!application.job){
    //         throw new HttpException("This job/application doesn't belongs to you", 422);
    //     }
    //     jobId = application.job;
    // }
    // const job = await jobService.get(req.params.job_id);
    // if(req.user._id !== job.organization._id) {
    //     console.log("xxxxxxxxxxxx")
    //     throw new HttpException("Access Forbidden", 403)
    // }
});