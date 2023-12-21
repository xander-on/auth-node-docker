import { User} from "../models";

//users
export const existsUserEmail = async( email:string ) => {

    const emailDB = await User.findOne({
        where:{ email }
    });

    if( emailDB )
        throw new Error(`El email: ${ email }, ya esta registrado`);
}


export const existsUserById = async( id:string ) => {
    const userById = await User.findByPk(id);
    if( !userById ) throw new Error(`No existe un usuario con el id: ${id}`);
}


