const {Router}=require('express')
const {getCategories,getCategoryById,postCategories,putCategories,deleteCategories}=require('../controllers/categories')

const {check}=require('express-validator')
const {validate}=require('../validations/validate')
const { validateJWT } = require('../validations/validate-jwt')
const { adminRole } = require('../validations/roles-validate')

const router=Router()

router.get('/',getCategories)

router.get('/:id',[
    check ('id', 'El ID no es valido'). isMongoId(),
    validate
],getCategoryById)

router.post('/',[
    validateJWT,
    adminRole,
    check('category','La categoría no puede estar vacía').notEmpty(),
    check('category','La categoría debe ser enviada en mayúsculas').isUppercase(),
    validate
],postCategories)

router.put('/:id',[
    check('id').isMongoId(),
    validateJWT,
    adminRole,
    check('category','La categoría no puede estar vacía').notEmpty(),
    check('category','La categoría debe ser enviada en mayúsculas').isUppercase(),
    validate
],putCategories)

router.delete('/:id', [
    check ('id','EL ID solicitado no es valido'). isMongoId(),
    validateJWT,
    adminRole,
    validate
],deleteCategories)

module.exports=router