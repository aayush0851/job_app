import { Request } from "express";
import { applicationService } from "../services/entities/application.service";
import { deleteApplicationValidator } from "../validator/application.validator";
import { baseController } from "./base.controller";
import { changeStatusValidator } from "../validator/application.validator";
import { jobService } from "../services/entities/job.service";
import { ApplicationStatus } from "../enum/application.enum";
import { ApplicationDataInterface } from "../interface/application.interface";
import { isValidObjectId } from "mongoose";
import { ApplicationExporter } from "../exporters/application.exporter";


export const addApplication = baseController(async (req: Request) => {

    const jobIdCommaSeparatedString: string = req.body.job_ids;
    const jobIds: string [] = jobIdCommaSeparatedString.split(",");

    const promise = jobIds.map(async (jobId) => {
        let applicationData: ApplicationDataInterface = {};
        
        
        if(!isValidObjectId(jobId)){
            applicationData.message = `Job with JOB-ID: "${jobId}" is invalid`;
        }
        else {
            const job = await jobService.get(jobId);
            let application = await applicationService.getApplicationByUserIdAndJobId(req.user._id, jobId);
            if(!application) {
                applicationData.job = job;
    
                if(!job.status){
                    applicationData.message = "This job opening has closed";
                }
                else if(job.no_of_vacancies <= 0){
                    applicationData.message = "There are no vacancies left for this job";
                }
    
                applicationData.application = await applicationService.create(jobId, req.user._id);
            }else{
                applicationData.message = "You have already applied to this job";
                applicationData.application = application;
                applicationData.job = job;
            }
        }
        return applicationData;
    });
    const applicationDataArray: ApplicationDataInterface[] = await Promise.all(promise);
    return applicationDataArray;
});

export const rejectOrAcceptCandidateApplication = baseController(async (req: Request) => {
    const applicationId = req.params.application_id;
    const status = req.body.application_status;
    const application = await applicationService.changeStatus(applicationId, status);
    console.log(application)
    const job = await jobService.get(application.job);
    if(status === ApplicationStatus.ACCEPTED){
        await jobService.handleVacancies(job._id);
    }
    return new ApplicationExporter().export(application);
}, changeStatusValidator);

export const deleteApplication = baseController(async (req: Request) => {
    const applicationId = req.params.application_id;
    await applicationService.delete(applicationId);
    return {
        message: "Application deleted"
    };
}, deleteApplicationValidator);