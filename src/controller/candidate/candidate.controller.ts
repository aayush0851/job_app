import { Request } from "express";
import { CandidateInterface } from "../../interface/candidate.interface";
import { candidateService } from "../../services/entities/candidate.service";
import { addCandidateValidator, candidateLoginValidator } from "../../validator/candidate.validator";
import { baseController } from "../base.controller";
import * as bcrypt from "bcrypt";
import { jwtService } from "../../services/factories/jwt.service";

export const signup = baseController(async (req: Request) => {
    const data = req.body as CandidateInterface;
    const newRecruiter = await candidateService.create(data);
    return newRecruiter;
}, addCandidateValidator);

export const login = baseController(async (req: Request) => {
    let data = req.body;
    const candidate = await candidateService.getCandidateByEmail(data.email);
    if(!bcrypt.compareSync(data.password, candidate.password)){
        // throw new Error("Incorrect Password");
    }
    return {
        auth_token: jwtService.createToken(candidate._id),
        user: candidate
    }
}, candidateLoginValidator);