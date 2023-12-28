import { Sequelize } from 'sequelize';

export const initDB = () => {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbName = process.env.DB_NAME || 'auth-node';
    const dbUser = process.env.DB_USER || 'root';
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

