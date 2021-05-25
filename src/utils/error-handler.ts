import { NextFunction, Request, Response } from "express"

export const errorHandler = (method: Function) => (async (req: Request, res: Response, next: NextFunction) => {
    try{
        await method(req, res, next);
    }
    catch(e){
        res.status(200).json({
            message: e?.message,
            errors: e?.errors
        });
    }
});