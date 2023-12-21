import { Sequelize } from 'sequelize';

export const initDB = () => {
    const dbHost = process.env.DB_HOST || 'mysql';
    const dbName = process.env.DB_NAME|| 'auth-node';
    const dbUser =  'root';
    const dbPass = process.env.DB_PASSWORD ||'1234';

    return new Sequelize(dbName!, dbUser, dbPass, {
        host: dbHost,
        dialect: 'mysql'
    });
}

export const testConnection = async() => {

    try {
        const db = initDB();
        await db.authenticate();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log(error)
    }
}

