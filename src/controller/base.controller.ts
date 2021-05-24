import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { errorHandler } from "../utils/error-handler";

export function baseController(method: Function, validatorSchema: Schema = null){
    const handler = (async(req: Request, res: Response, next: NextFunction) => {
        const data = {...req.body, ...req.params, ...req.query};
        if(validatorSchema){
            try{
                await validatorSchema.validateAsync(data);
            }
            catch(e){
                return res.status(422).json({
                    message: e.message,
                    errors: e.errors
                })
            }
        }
        const response = await method.apply(null, [req, res, next]);
        return res.json(response);
    });
    return errorHandler(handler);
};