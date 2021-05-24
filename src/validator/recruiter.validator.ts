import Joi, { Schema } from "joi";
import { recruiterService } from "../services/entities/recruiter.service";

export const addRecruiterValidator: Schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string(),
    email: Joi.string().email().required().external(recruiterService.recruiterEmailNotExists),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password')
})
.with('password', 'confirm_password');

export const recruiterLoginValidator: Schema = Joi.object({
    email: Joi.string().email().required().external(recruiterService.recruiterEmailExists),
    password: Joi.string().required()
});