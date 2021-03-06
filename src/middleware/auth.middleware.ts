import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../enum/user.enum";
import { CandidateInterface } from "../interface/candidate.interface";
import { RecruiterInterface } from "../interface/recruiter.interface";
import { blacklistedTokenService } from "../services/entities/blacklisted-token.service";
import { candidateService } from "../services/entities/candidate.service";
import { recruiterService } from "../services/entities/recruiter.service";
import { jwtService } from "../services/factories/jwt.service";
import { HttpException } from "../utils/exception";
import { baseMiddleware } from "./base.middleware";

export const authMiddleware = baseMiddleware(async (req: Request, res: Response, next: NextFunction) => {

    //@ts-ignore
    const authToken = req.headers.authorization;
    if(!authToken){
        throw new HttpException("You need to login first", 422);
    }

    const isBlacklisted = await blacklistedTokenService.isTokenBlacklisted(authToken);
    if(isBlacklisted) {
        throw new HttpException("You need to login first", 422);
    }

    const payload  = jwtService.parseToken(authToken);
    if(!payload){
        throw new HttpException("Invalid Token", 422);
    }

    //@ts-ignore
    const UID = payload._id;
    let user: CandidateInterface | RecruiterInterface;
    
    user = await candidateService.get(UID) ?? await recruiterService.get(UID);
    
    if(!user){
        throw new HttpException("Invalid Token", 422);
    }
    
    user["user_type"] = user.collection.name==="recruiters" ?  UserTypes.RECRUITER : UserTypes.CANDIDATE;

    req.user = user;
});