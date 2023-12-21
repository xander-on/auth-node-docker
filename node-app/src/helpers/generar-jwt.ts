import jwt from 'jsonwebtoken';

export const generarJWT = ( uid = '' ):Promise<string> => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        const jwtSec = process.env.JWT_SECRET;

        if (!jwtSec) {
            reject('No se pudo generar el token');
            return;
        }

        try {
            const token = jwt.sign( payload, jwtSec, {expiresIn: '12h'} );
            resolve(token);

        } catch (error) {
            console.log(error);
            reject('No se pudo generar el token');
        }
    });
}
