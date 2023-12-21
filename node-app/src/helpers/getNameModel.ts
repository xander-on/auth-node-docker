import { Role, User} from "../models";

export const getNameModel = ( model:any ):string => {

    const models = [
        { type: User, name:'Usuario'},
        { type: Role, name:'Rol'}
    ];

    const matchingModel = models.find(item => item.type === model);

    return matchingModel ? matchingModel.name : 'Registro';

}
