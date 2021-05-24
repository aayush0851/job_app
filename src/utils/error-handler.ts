import { NextFunction, Request, Response } from "express"

export const errorHandler = (method: Function) => (async (req: Request, res: Response, next: NextFunction) => {
    try{
        await method(req, res, next);
    }
    catch(e){
        console.log(e);
        res.status(422).json({
            message: e.message,
            error: e.error
        });
    }
});