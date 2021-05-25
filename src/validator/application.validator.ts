import Joi, { Schema } from "joi";
import { ApplicationStatus } from "../enum/application.enum";
import { applicationService } from "../services/entities/application.service";
import { HttpException } from "../utils/exception";
import { jobExists } from "./job.validator";

const applicationExists = async(applicationId: string) => {
    const application = await applicationService.get(applicationId);
    if(!application) {
        throw new HttpException("Application not found", 404);
    }
    return applicationId;
}

export const addApplicationValidator: Schema = Joi.object({
    job_id: Joi.string().required().external(jobExists),
    application_status: Joi.string().valid(...Object.values(ApplicationStatus))
});

export const changeStatusValidator: Schema = Joi.object({
    application_id: Joi.string().required().external(applicationExists),
    application_status: Joi.string().valid(...Object.values(ApplicationStatus))
});

export const deleteApplicationValidator: Schema = Joi.object({
    application_id: Joi.string().required().external(applicationExists)
});