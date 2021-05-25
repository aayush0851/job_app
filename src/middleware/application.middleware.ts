import { NextFunction, Request, Response } from "express";
import { applicationService } from "../services/entities/application.service";
import { HttpException } from "../utils/exception";
import { baseMiddleware } from "./base.middleware";

export const applicationMiddleware = baseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const applicationId = req.params.application_id;
    const application = await applicationService.get(applicationId);
    if(req.user._id !== application.applicant) {
        throw new HttpException("Access Forbidden", 403)
    }
});