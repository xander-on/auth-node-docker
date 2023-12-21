import { initDB }        from "../db/connectionDB";
import { DataTypes, Model } from 'sequelize';

const db = initDB();

// export const Role = db.define( 'Roles', {
//     id:{
//         type: DataTypes.UUID,
//         primaryKey: true,
//     },

//     name:{
//         type: DataTypes.STRING,
//         unique: true,
//     },

//     state:{
//         type: DataTypes.BOOLEAN
//     }

// });


export class Role extends Model{}

Role.init(
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
        },

        name:{
            type: DataTypes.STRING,
            unique: true,
        },

        state:{
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize: db,
        modelName: 'Role',
    }
)


Role.sync({ force: false })
  .then(() => {
    console.log('Model Role synchronized successfully');
  })
  .catch((error: Error) => {
    console.error('Error synchronizing model Role:', error);
  });
