import { Router } from "express";
import { login, renovarToken }  from "../controllers/authControllers";
import { check }  from "express-validator";
import { returnErrors, validarJwt }    from "../middlewares";


export const authRouter = Router();

const validatonsLogin = [
    check('email',    'El email es obligatorio').not().isEmpty(),
    check('email',    'No es un email valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    returnErrors
];

authRouter.get('/',       validarJwt, renovarToken);
authRouter.post('/login', validatonsLogin, login);
