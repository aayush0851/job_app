import { NextFunction, Request, Response } from "express";
import { CandidateInterface } from "../interface/candidate.interface";
import { RecruiterInterface } from "../interface/recruiter.interface";
import { candidateService } from "../services/entities/candidate.service";
import { recruiterService } from "../services/entities/recruiter.service";
import { jwtService } from "../services/factories/jwt.service";
import { HttpException } from "../utils/exception";
import { baseMiddleware } from "./base.middleware";

export const authMiddleware = baseMiddleware(async (req: Request, res: Response, next: NextFunction) => {

    //@ts-ignore
    const authToken = req.headers.authorization;
    if(!authToken){
        throw new HttpException("Token Not Found", 422);
    }

    const payload  = jwtService.parseToken(authToken);
    if(!payload){
        throw new HttpException("Invalid Token", 422);
    }

    //@ts-ignore
    const UID = payload._id;
    let user: CandidateInterface | RecruiterInterface;
    
    user = await candidateService.get(UID) ?? await recruiterService.get(UID);
    console.log(user);
    if(!user){
        throw new HttpException("Invalid Token", 422);
    }

    req.user = user;
});