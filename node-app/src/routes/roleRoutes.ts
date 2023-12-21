import { Router }         from "express";
import { check, param }   from "express-validator";
import { existsRoleName } from "../helpers";
// import { Role }           from "../models";
import { returnErrors } from "../middlewares";
import { getRoles, getRole, postRole }    from "../controllers/roleControllers";

export const roleRouter = Router();

const validationsGetRoles = [
    check('limit').optional().isInt({ gt: 0 })
    .withMessage('limit debe ser un número entero válido'),

    check('from').optional().isInt({ gt: 0 })
    .withMessage('offset debe ser un número entero válido'),

    returnErrors
];


const validationsGetRole= [
    param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
    // existsRecordById( Role ),
    returnErrors
];

const validationsPostRole = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( existsRoleName ),
    //todo isAdminRole
    returnErrors
];


// const validationsPutUser = [
//     param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
//     param('id').custom( existsUserById ),
//     check('email', 'El email no es valido').isEmail().optional(),
//     hasAValidField(['name', 'email', 'password']),
//     validateFields
// ];


// const validationsDeleteUser = [
//     param('id').isUUID().withMessage('El Id proporcionado no es válido.'),
//     param('id').custom( existsUserById ),
//     validateFields
// ];


roleRouter.get('/',       validationsGetRoles,   getRoles);
roleRouter.get('/:id',    validationsGetRole,    getRole);
roleRouter.post('/',      validationsPostRole,   postRole);
// router.put('/:id',    validationsPutUser,    putRole);
// router.delete('/:id', validationsDeleteUser, deleteRole)


// export default router;
