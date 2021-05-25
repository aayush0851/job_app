import { Request } from "express";
import { applicationService } from "../services/entities/application.service";
import { addApplicationValidator, deleteApplicationValidator } from "../validator/application.validator";
import { baseController } from "./base.controller";
import { changeStatusValidator } from "../validator/application.validator";
import { jobService } from "../services/entities/job.service";
import { HttpException } from "../utils/exception";
import { ApplicationStatus } from "../enum/application.enum";

export const addApplication = baseController(async (req: Request) => {
    const data: any = {};
    const jobId = req.body.job_id;
    let application = await applicationService.getApplicationByUserIdAndJobId(req.user._id, jobId);
    if(!application) {
        const job = await jobService.get(jobId);
        if(job.no_of_vacancies <= 0){
            throw new HttpException("This job has no availabe vacancies", 422);
        }
        if(!job.status){
            throw new HttpException("This job opening has been closed", 200);
        }
        application = await applicationService.create(jobId, req.user._id);
    }else{
        data["message"] = "You have already applied to this job";
    }
    data["application"] = application;
    return data;
}, addApplicationValidator);

export const rejectOrAcceptCandidateApplication = baseController(async (req: Request) => {
    const applicationId = req.params.application_id;
    const status = req.body.application_status;
    const application = await applicationService.changeStatus(applicationId, status);
    const job = await jobService.get(application.job);
    if(status === ApplicationStatus.ACCEPTED){
        await jobService.handleVacancies(job._id);
    }
    return application;
}, changeStatusValidator);

export const deleteApplication = baseController(async (req: Request) => {
    const applicationId = req.params.application_id;
    await applicationService.delete(applicationId);
    return {
        message: "Application deleted"
    };
}, deleteApplicationValidator);