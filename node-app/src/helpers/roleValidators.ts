import { Role } from "../models";


//roles
export const existsRoleName = async( name:string ) => {
    const roleNameDB = await Role.findOne({ where:{ name } });
    if( roleNameDB ) throw new Error(`Ya existe un rol con el nombre: ${name}`)
}



export const getRoleByName = async( nameRole:string ) => {
    const roleDB = await Role.findOne({ where:{ name:nameRole.toUpperCase()} });

    if( !roleDB ) {
        //todo validar role o  state false
        console.log(`No existe en la DB un rol llamado ${nameRole}`);
        return;
    }

    const { id, name } = roleDB.dataValues;

    return {id, name};
}
