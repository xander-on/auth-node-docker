import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


export const returnErrors = ( req:Request, res:Response, next:NextFunction ) => {
    const errors = validationResult(req);
    const errorsArr = errors.array().map( e => `${e.msg}`);
    if( !errors.isEmpty() )
        return res.status(400).json({ errors:errorsArr });

    next();
}

