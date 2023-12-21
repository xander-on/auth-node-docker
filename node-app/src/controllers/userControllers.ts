import { Request, Response } from "express";
import bcrypt                from 'bcryptjs';
import { v4 as uuidv4 }      from 'uuid';
import { User, Role }        from "../models";
import { DataUrls }          from "../interfaces/DataUrls";
import {
    getRoleByName,
    nextPrevUrlGenerator,
    getRecordValidById }    from "../helpers";


//todo usar enums
export const responseUser = {
    attributes : {
        exclude: ['password', 'role_id', 'createdAt', 'updatedAt']
    },
    include: [
        { model: Role, attributes: ['id','name'], as: 'role' }
    ],
}


//ok
export const getUsers = async( req:Request, res:Response ) => {

    const { limit=12, from=1 } = req.query;

    const limitNumber = Number(limit);
    const fromNumber  = Number(from);
    const query       = { state: true }

    const totalUsers = await User.count({ where: query });

    const users =  await User.findAll({
        order      : [['createdAt', 'ASC']],
        limit      : limitNumber,
        offset     : fromNumber-1,
        where      : query,

        ...responseUser
    });

    const dataUrls:DataUrls = {
        limit      : limitNumber,
        from       : fromNumber,
        total      : totalUsers,
        collection : 'users'
    }

    const { next, prev } = nextPrevUrlGenerator( dataUrls );

    res.json({
        total_users:totalUsers,
        next,
        prev,
        results:users
    });

}


//ok
export const getUser = async( req:Request, res:Response ) => {
    const { id } = req.params;
    const userDB = await getRecordValidById({ model:User, id, res });

    if (!userDB) return;
    res.json( userDB );
}



//ok
export const postUser = async( req:Request, res:Response ) => {

    const { name, email, password } = req.body;

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRole    = await getRoleByName('USER_ROLE');
    const uid = uuidv4();

    const userToCreate = {
        id       : uid,
        name     : name.toUpperCase(),
        email    : email.toUpperCase(),
        password : hashedPassword,
        role_id  : defaultRole?.id,
        state    : true,
        image    : `https://api.multiavatar.com/${uid}.png`
    }

    const userCreated  = await User.create(userToCreate);

    const optionsSearchRecord = {
        model:User,
        id:userCreated.dataValues.id,
        res
    };
    const userResponse = await getRecordValidById( optionsSearchRecord );

    res.json( userResponse );
}



//ok
export const putUser = async( req:Request, res:Response ) => {

    const { id } = req.params;

    //todo permitir actualizar role
    const { name, email, password, image } = req.body;
    let hashedPassword = '';

    const userDB = await getRecordValidById({ model:User, id, res });

    if ( !userDB ) return;

    const {
        name:nameDB,
        email:emailDB,
        password:passwordDB,
        image:imageDB
    } = userDB.dataValues;

    // Encripta la contraseña nueva del body
    if( password ) hashedPassword = await bcrypt.hash(password, 10);

    const userToUpdate = {
        name     : name     ? name.toUpperCase()  : nameDB,
        email    : email    ? email.toUpperCase() : emailDB,
        password : password ? hashedPassword      : passwordDB,
        image    : image    ? image               : imageDB
    }

    const userUpdated = await userDB.update( userToUpdate );
    delete userUpdated?.dataValues.updatedAt;

    res.json( userUpdated );
}



//ok
export const deleteUser = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const userDB = await getRecordValidById( {model:User, id, res } );

    if ( !userDB ) return;

    const userDelete = await userDB.update({ state:false });

    delete userDelete?.dataValues.state;
    delete userDelete?.dataValues.updatedAt;

    res.json( userDelete );
}
