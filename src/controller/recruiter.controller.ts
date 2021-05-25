import { Request } from "express";
import { RecruiterInterface } from "../interface/recruiter.interface";
import { recruiterService } from "../services/entities/recruiter.service";
import { addRecruiterValidator, recruiterLoginValidator } from "../validator/recruiter.validator";
import { baseController } from "./base.controller";
import * as bcrypt from "bcrypt";
import { jwtService } from "../services/factories/jwt.service";
import { HttpException } from "../utils/exception";
import { applicationService } from "../services/entities/application.service";

export const signup = baseController(async (req: Request) => {
    let data = req.body as RecruiterInterface;
    const newRecruiter = await recruiterService.create(data);
    return newRecruiter;
}, addRecruiterValidator);

export const login = baseController(async (req: Request) => {
    let data = req.body;
    const recruiter = await recruiterService.getRecruiterByEmail(data.email);
    if(!bcrypt.compareSync(data.password, recruiter.password)){
        throw new HttpException("Incorrect Password", 422);
    }
    return {
        auth_token: await jwtService.createToken(recruiter._id),
        user: recruiter
    }
}, recruiterLoginValidator);