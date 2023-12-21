import { Router }       from "express";
import { getUpdateImage, updateImageCloudinary }
    from "../controllers/uploadControllers";
import { returnErrors, validateFiles } from "../middlewares";
import {  check, param } from "express-validator";
import { isValidCollection } from "../helpers";

export const uploadRouter = Router();

const validatorsUpdateImage = [
    validateFiles,
    param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
    check('collection').custom( c => isValidCollection( c, ['users', 'heroes']) ),
    returnErrors
];

uploadRouter.put('/:collection/:id', validatorsUpdateImage, updateImageCloudinary);
uploadRouter.get('/', getUpdateImage)
