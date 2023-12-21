import { Request, Response }    from "express";
import { v4 as uuidv4 }         from 'uuid';
import { DataUrls }             from "../interfaces/DataUrls";
import { nextPrevUrlGenerator } from "../helpers/urls-generator";
import { Role } from "../models";


const fieldsToHide = {
    attributes: { exclude: ['state'] },
}


export const getRoles = async( req:Request, res:Response ) => {

    const { limit=12, from=1 } = req.query;

    const limitNumber = Number(limit);
    const fromNumber  = Number(from);

    const query = { state: true }

    const totalRoles = await Role.count({ where: query });

    const roles =  await Role.findAll({
        attributes : { exclude: ['state'] },
        where      : query,
        order      : [['createdAt', 'ASC']],
        limit      : limitNumber,
        offset     : fromNumber-1,
    });

    const dataUrls:DataUrls = {
        limit      : limitNumber,
        from       : fromNumber,
        total      : totalRoles,
        collection : 'roles'
    }

    const { next, prev } = nextPrevUrlGenerator( dataUrls );

    res.json({
        total_roles:totalRoles,
        next,
        prev,
        results:roles
     });
}


export const getRole = async( req:Request, res:Response ) => {

    const { id } = req.params;
    const role = await Role.findByPk(id, fieldsToHide);

    role
        ? res.json({ role })
        : res.status(404).json({ msg: `No existe un usuario con el id ${id}`});
}



export const postRole = async( req:Request, res:Response ) => {

    const { name } = req.body;

    const roleToCreate = {
        id       : uuidv4(),
        name     : name.toUpperCase(),
        state    : true
    }

    const newRole = Role.build( roleToCreate );
    await newRole.save();

    const newUserId = newRole.getDataValue('id');
    const roleCreated = await Role.findByPk( newUserId, fieldsToHide);

    res.json( roleCreated );

}


// export const putUser = async( req:Request, res:Response ) => {

//     const { id } = req.params;
//     const { name, email, password } = req.body;
//     let hashedPassword = '';

//     const userDB = await User.findByPk( id, fieldsToHide );

//     const {
//         name:nameDB,
//         email:emailDB,
//         password:passwordDB
//     } = userDB!.dataValues;

//     // Encripta la contraseña
//     if(password){
//         const saltRounds = 10;
//         hashedPassword = await bcrypt.hash(password, saltRounds);
//     }

//     const userToUpdate = {
//         name     : name     ? name.toUpperCase()  : nameDB,
//         email    : email    ? email.toUpperCase() : emailDB,
//         password : password ? hashedPassword      : passwordDB,
//     }

//     await userDB!.update( userToUpdate );
//     const userUpdated = await User.findByPk(id, fieldsToHide);

//     res.json( userUpdated );
// }


// export const deleteUser = async( req:Request, res:Response ) => {

//     const { id } = req.params;
//     const user   = await User.findByPk( id );

//     await user!.update({ state:false });

//     const userDelete = await User.findByPk(id, fieldsToHide);

//     res.json( userDelete );
// }
