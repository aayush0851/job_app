import Joi, { Schema } from "joi";
import { candidateService } from "../services/entities/candidate.service";

export const addCandidateValidator: Schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password'),
    date_of_birth: Joi.string().isoDate().required()
})
.with('password', 'confirm_password');

export const candidateLoginValidator: Schema = Joi.object({
    email: Joi.string().email().required().external(candidateService.candidateEmailExists),
    password: Joi.string().required()
});