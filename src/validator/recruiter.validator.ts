import Joi, { Schema } from "joi";
import { recruiterService } from "../services/entities/recruiter.service";
import { HttpException } from "../utils/exception";

const recruiterEmailNotExists = async (email: string) => {
    const recruiter = await recruiterService.getRecruiterByEmail(email);
    if(recruiter){
        throw new HttpException('Email already in use', 422);
    }
    return email;
}

const recruiterEmailExists = async (email: string) => {
    const recruiter = await recruiterService.getRecruiterByEmail(email);
    if(!recruiter){
        throw new HttpException('Invalid Email ID', 404);
    }
    return email;
}

export const addRecruiterValidator: Schema = Joi.object({
    organization_name: Joi.string().min(3).required(),
    organization_description: Joi.string(),
    address: Joi.string(),
    website: Joi.string().required(),
    email: Joi.string().email().required().external(recruiterEmailNotExists),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password')
})
.with('password', 'confirm_password');

export const recruiterLoginValidator: Schema = Joi.object({
    email: Joi.string().email().required().external(recruiterEmailExists),
    password: Joi.string().required()
});