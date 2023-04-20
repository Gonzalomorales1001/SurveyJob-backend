const {Router}=require('express')
const {getUsers,getUserByID,postUsers,putUsers,deleteUsers}=require('../controllers/users')

const {check}=require('express-validator')
const {validate}=require('../validations/validate')
const { validateJWT } = require('../validations/validate-jwt')
const { adminRole } = require('../validations/roles-validate')

const router=Router()

router.get('/',getUsers)

router.get('/:id',[
    check('id','No has enviado una ID válida').isMongoId(),
    validate
],getUserByID)

router.post('/',[
    check('username','El nombre de usuario no puede estar vacío').notEmpty().isString(),
    check('email','El email no puede estar vacío').notEmpty(),
    check('email','No has enviado un email válido').isEmail(),
    check('password','La contraseña no puede estar vacía').notEmpty(),
    check('password','La contraseña debe tener almenos 8 carácteres, letras mayúsculas, minúsculas, numeros y símbolos').isStrongPassword(),
    validate,
],postUsers)

router.put('/:id',[
    //verificar que este logeado,
    validateJWT,
    check('id','No has enviado una ID válida').isMongoId(),
    validate
],putUsers)

router.delete('/:id',[
    //verificar que este logeado
    validateJWT,
    //verificar que sea un admin o el dueño del usuario
    adminRole,
    check('id','No has enviado una ID válida').isMongoId(),
    validate
],deleteUsers)

module.exports=router