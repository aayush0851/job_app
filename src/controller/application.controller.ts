import { Request } from "express";
import { applicationService } from "../services/entities/application.service";
import { addApplicationValidator } from "../validator/application.validator";
import { baseController } from "./base.controller";

export const addApplication = baseController(async (req: Request) => {
    const jobId = req.params.job_id;
    const application = await applicationService.create(jobId, req.user._id);
    return application;
}, addApplicationValidator);