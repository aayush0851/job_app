import { Request } from "express";
import { RecruiterInterface } from "../../interface/recruiter.interface";
import { recruiterService } from "../../services/entities/recruiter.service";
import { addRecruiterValidator, recruiterLoginValidator } from "../../validator/recruiter.validator";
import { baseController } from "../base.controller";
import * as bcrypt from "bcrypt";
import { jwtService } from "../../services/factories/jwt.service";

export const signup = baseController(async (req: Request) => {
    let data = req.body as RecruiterInterface;
    data.password = bcrypt.hashSync(data.password, 5); 
    const newRecruiter = await recruiterService.create(data);
    return {
        auth_token: jwtService.createToken(newRecruiter._id),
        user: newRecruiter
    };
}, addRecruiterValidator);

export const login = baseController(async (req: Request) => {
    let data = req.body;
    const recruiter = await recruiterService.getRecruiterByEmail(data.email);
    if(!bcrypt.compareSync(data.password, recruiter.password)){
        // throw new Error("Incorrect Password");
    }
    return {
        auth_token: jwtService.createToken(recruiter._id),
        user: recruiter
    }
}, recruiterLoginValidator);