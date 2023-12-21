import { Request, Response } from "express";
import { User }             from "../models";
import { generarJWT, getRecordValidById, getUserByToken } from "../helpers";
import bcryptjs              from "bcryptjs";


export const login = async( req:Request, res:Response) => {

    const { email, password } = req.body;

    const userDB = await User.findOne({ where:{ email } });

    if( !userDB )
        return res.status(400).json({
            errors: [`Usuario / Password no son correctos - email`]
        });

    if( !userDB?.dataValues.state ){
        return res.status(400).json({
            errors: [`El usuario no esta activo`]
        });
    }

    //verificar el password
    const validPassword = bcryptjs.compareSync( password, userDB.dataValues.password );

    if( !validPassword ){
        return res.status(400).json({
            errors: ['Usuario / Password no son correctos - password']
        });
    }

    //todo validar si es necesario todo el user o solo enviar el id

    const optionsSearchRecord = {model:User, id:userDB.dataValues.id, res };
    const user  = await getRecordValidById( optionsSearchRecord );

    const token = await generarJWT( userDB.dataValues.id );

    res.json( {user, token} );
}



export const renovarToken = async( req:Request, res:Response ) => {
    const token  = req.header('x-token');
    const user   = await getUserByToken( token!, res );

    if( !user ) return null;

    //Generar el nuevo JWT
    const newToken = await generarJWT( user.dataValues.id );

    res.json( {
        user,
        token:newToken
    });
}
