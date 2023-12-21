import { NextFunction, Request, Response } from "express";


export const validateFiles = (
    req:Request,
    res:Response,
    next:NextFunction
) => {

    if( !req.files || Object.keys(req.files).length === 0 || !req.files.image )
        return res.status(400).json({
            msg:'No hay imagen que subir - validateFile'
        });


    if( Object.keys(req.files).length > 1 )
        return res.status(400).json({
            msg: 'Solo puede cargar una imagen'
        });

    next();
}

