import { Router }          from "express";
import { check, param }    from "express-validator";
import { existsUserEmail } from "../helpers";


import { hasAValidField, returnErrors, validarJwt } from "../middlewares";

import {
    deleteUser,
    getUser,
    getUsers,
    postUser,
    putUser
} from "../controllers/userControllers";


export const userRouter = Router();


const validationsGetUsers = [
    validarJwt,
    check('limit').optional().isInt({ gt: 0 })
        .withMessage('limit debe ser un número entero válido'),

    check('from').optional().isInt({ gt: 0 })
        .withMessage('offset debe ser un número entero válido'),

    returnErrors
];


const validationsGetUser = [
    validarJwt,
    param('id').isUUID().withMessage('El Id proporcionado no es válido'),
    returnErrors
];


const validationsPostUser = [
    check('email',    'El email no es valido').isEmail(),
    check('email').custom(existsUserEmail),
    check('name',     'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    returnErrors
];


const validationsPutUser = [
    validarJwt,
    param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
    check('email', 'El email no es valido').isEmail().optional(),
    hasAValidField(['name', 'email', 'password']),
    returnErrors
];


const validationsDeleteUser = [
    validarJwt,
    param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
    returnErrors
];


userRouter.get('/',       validationsGetUsers,   getUsers);
userRouter.get('/:id',    validationsGetUser,    getUser);
userRouter.post('/',      validationsPostUser,   postUser);
userRouter.put('/:id',    validationsPutUser,    putUser);
userRouter.delete('/:id', validationsDeleteUser, deleteUser)
