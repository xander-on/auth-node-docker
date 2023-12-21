import jwt, { JwtPayload } from "jsonwebtoken";
import { Response }     from 'express';
import { User }         from "../models";
import { getNameModel } from "./getNameModel";
import { responseUser } from "../controllers/userControllers";
import { OptionsSearchRecord } from "../interfaces/OptionsSearchRecord";


export const getUserByToken = async (token:string, res:Response ):Promise<User | null> => {
    const { uid } = jwt.verify( token, process.env.JWT_SECRET! ) as JwtPayload;
    const optionsSearchRecord = {model:User, id:uid, res };

    return await getRecordValidById( optionsSearchRecord )
}



//devuelve un registro buscado por id
export const getRecordValidById = async( optionsSearchRecord:OptionsSearchRecord ) => {

    const { model, id, res } = optionsSearchRecord;

    let record       = undefined;
    let errorMessage = '';
    const nameModel  = getNameModel( model ).toLowerCase();

    console.log( {nameModel, model} );

    const recordById  = await model.findByPk( id, responseUser );
    const recordState = recordById?.dataValues.state;
    delete recordById?.dataValues.state;

    !recordById
        ? errorMessage = `No existe ${ nameModel || 'registro'} con el Id: ${id}`
        : recordState
            ? record = recordById
            : errorMessage = `El ${ nameModel || 'registro'} no esta activo`

    if( errorMessage ) res.status(400).json({ errors: [errorMessage] });

    return record;
};
