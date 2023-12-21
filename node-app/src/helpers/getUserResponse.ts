// import { Role, User } from "../models";



// export const getUserResponse = async( user:User ) => {

//     console.log( user );

//     const { id, name, email, role_id }  = user.dataValues;
//     const role  = await Role.findByPk( role_id );
//     const { id:idRole, name:nameRole } = role!.dataValues;

//     const userResponse = {
//         id,
//         name,
//         email,
//         role  : { id:idRole, name:nameRole }
//     };

//     return userResponse;
// }
