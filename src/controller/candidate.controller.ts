import { Request } from "express";
import { CandidateInterface } from "../interface/candidate.interface";
import { candidateService } from "../services/entities/candidate.service";
import { addCandidateValidator, candidateLoginValidator } from "../validator/candidate.validator";
import { baseController } from "./base.controller";
import * as bcrypt from "bcrypt";
import { jwtService } from "../services/factories/jwt.service";
import { HttpException } from "../utils/exception";
import { applicationService } from "../services/entities/application.service";
import { CandidateExporter } from "../exporters/candidate.exporter";
import { ApplicationExporter } from "../exporters/application.exporter";

export const signup = baseController(async (req: Request) => {
    const data = req.body as CandidateInterface;
    const newCandidate = await candidateService.create(data);
    return new CandidateExporter().export(newCandidate);
}, addCandidateValidator);

export const login = baseController(async (req: Request) => {
    let data = req.body;
    const candidate = await candidateService.getCandidateByEmail(data.email);
    if(!bcrypt.compareSync(data.password, candidate.password)){
        throw new HttpException("Incorrect Password", 422);
    }
    return {
        auth_token: await jwtService.createToken(candidate._id),
        user: await new CandidateExporter().export(candidate)
    }
}, candidateLoginValidator);

export const listMyApplications = baseController(async(req: Request) => {
    const myJobs = await applicationService.listMyApplication(req.user._id);
    return new ApplicationExporter().exportList(myJobs);
});