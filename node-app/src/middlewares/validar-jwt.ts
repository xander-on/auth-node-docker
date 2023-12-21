import { NextFunction, Request, Response } from "express";
import { getUserByToken } from "../helpers";


export const validarJwt = async( req:Request, res:Response, next:NextFunction ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            errors: ['No hay token en la peticion']
        });
    }

    try{
        const user = await getUserByToken(token, res);

        if( !user ){
            return res.status(401).json({
                errors: ['Token no valido - usuario no existe en DB']
            });
        }

        // //verificar si el uid tiene estado en true
        // if ( user.dataValues.state !== true ) {
        //     return res.status(401).json({
        //         errors: ['Token no valido - usuario no esta activo']
        //     });
        // }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ errors: ['Token no valido'] });
    }
}
