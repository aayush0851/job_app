import Joi, { Schema } from "joi";
import { ApplicationStatus } from "../enum/application.enum";
import { jobExists } from "./job.validator";

export const addApplicationValidator: Schema = Joi.object({
    job_id: Joi.string().required().external(jobExists),
    application_status: Joi.string().valid(ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED, ApplicationStatus.PENDING)
});