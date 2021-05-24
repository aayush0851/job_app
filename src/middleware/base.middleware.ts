import { errorHandler } from "../utils/error-handler";
import { Request, Response, NextFunction } from "express";

export const baseMiddleware = (method: Function) => errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    await method(req, res, next);
    next();
});