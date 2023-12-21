import { Request, Response, NextFunction } from 'express';

/**
 * validates that it has at least one valid field
 */
export const hasAValidField = ( fields:string[] ) => {

    return ( req:Request, res:Response, next:NextFunction ) => {

        const bodyFields = Object.keys(req.body);
        const isValid    = fields.some(field => bodyFields.includes(field));

        if( !isValid ){
            //todo no lanzar res sino error
            return res.status(401).json({
                Errors:[`No existe al menos un campo valido para actualizar: ${fields}`]
            });
        }

        next();
    }
}




