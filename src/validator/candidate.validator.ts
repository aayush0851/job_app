import Joi, { Schema } from "joi";
import { candidateService } from "../services/entities/candidate.service";

const candidateEmailNotExists = async (email: string) => {
    const candidate = await candidateService.getCandidateByEmail(email)
    if(candidate){
        throw new Error('Email already in use');
    }
    return email;
}

const candidateEmailExists = async (email: string) => {
    const candidate = await candidateService.getCandidateByEmail(email);
        if(!candidate){
            throw new Error('Invalid Email ID');
        }
        return email;
}

export const addCandidateValidator: Schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string(),
    email: Joi.string().email().required().external(candidateEmailNotExists),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password'),
    date_of_birth: Joi.string().isoDate().required(),
    phone_number: Joi.string().min(10).max(13),
    working_experience_yrs: Joi.number().integer().required(),
    portfolio_link: Joi.string()
})
.with('password', 'confirm_password');

export const candidateLoginValidator: Schema = Joi.object({
    email: Joi.string().email().required().external(candidateEmailExists),
    password: Joi.string().required()
});