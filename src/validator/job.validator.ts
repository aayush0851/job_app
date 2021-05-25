import Joi, { Schema } from "joi";
import { JobTypes } from "../enum/job.enum";
import { jobService } from "../services/entities/job.service";
import { HttpException } from "../utils/exception";

export const jobExists = async (jobId: string) => {
    const job = await jobService.get(jobId);
    if(!job){
        throw new HttpException('Job not found', 404);
    }
    return jobId;

}

export const addJobValidator: Schema = Joi.object({
    job_position: Joi.string().required(),
    job_description: Joi.string().required(),
    job_type: Joi.string().valid(...Object.values(JobTypes)),
    no_of_vacancies: Joi.number().integer().min(1).required()
});

export const listJobApplicantValidator: Schema = Joi.object({
    job_id: Joi.string().required().external(jobExists)
})