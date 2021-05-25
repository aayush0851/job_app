import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../enum/user.enum";
import { HttpException } from "../utils/exception";
import { baseMiddleware } from "./base.middleware";

export const recruiterMiddleware = baseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    if(req.user.user_type !== UserTypes.RECRUITER) {
        throw new HttpException("Access Forbidden", 403)
    }
});