
import { initDB} from "../db/connectionDB";
import { DataTypes, Model } from 'sequelize';
import { Role }             from '../models';

const db = initDB();
export class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        role_id: {
            type: DataTypes.UUID,
        },
        state: {
            type: DataTypes.BOOLEAN,
        },
        image:{
            type: DataTypes.STRING

        }
    },
    {
        sequelize: db,
        modelName: 'User',
    }
);


User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role',
});



// Sincronizar el modelo con la base de datos

User.sync({ force: false })
    .then(() => {
        console.log('Modelo User sincronizado con la base de datos');
    })
    .catch((error) => {
        console.error('Error al sincronizar el modelo User:', error);
    });

