import express, { Application }   from 'express';
import cors                       from 'cors';
import { userRouter, roleRouter } from '../routes';
import { testConnection }         from '../db/connectionDB';

import { authRouter }             from '../routes/authRoutes';
import { uploadRouter }           from '../routes/uploadsRoutes';

import fileUpload from 'express-fileupload';


export class Server{

    private domain:string  = process.env.DOMAIN || '';
    private urlBase:string = process.env.URL_BASE || '';
    private port:string    = process.env.APP_PORT || '3000';
    private urlAPI:string  = `${this.domain}:${this.port}${this.urlBase}`;

    private app:Application;

    private apiPaths = {
        users   : `${this.urlBase}/users`,
        roles   : `${this.urlBase}/roles`,
        auth    : `${this.urlBase}/auth`,
        uploads : `${this.urlBase}/uploads`
    }

    constructor(){

        this.app = express();

        this.dbConnection();
        this.middlewares();
        this.routes();
    }


    getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)
    }

    async dbConnection(){
        await testConnection();
    }


    middlewares(){

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( this.urlBase, express.static('public') );

        this.app.use(
            fileUpload({
                useTempFiles     :true,
                tempFileDir      : '/tmp/',
                createParentPath : true
            })
        );
    }


    routes(){
        this.app.use( this.apiPaths.users,   userRouter );
        this.app.use( this.apiPaths.roles,   roleRouter );
        this.app.use( this.apiPaths.auth,    authRouter );
        this.app.use( this.apiPaths.uploads, uploadRouter);
    }


    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en: ${this.urlAPI}` );
        });
    }

}
