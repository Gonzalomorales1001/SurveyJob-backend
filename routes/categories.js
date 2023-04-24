const {Router}=require('express')
const {getCategories,getCategoryById,postCategories,putCategories,deleteCategories}=require('../controllers/categories')

const {check}=require('express-validator')
const {validate}=require('../validations/validate')
const { validateJWT } = require('../validations/validate-jwt')
const { adminRole } = require('../validations/roles-validate')

const router=Router()

router.get('/',getCategories)

router.get('/:id',[
    validateJWT, 
    check ('category, El ID no es valido'). isMongoId(),
    validate
],getCategoryById)

router.post('/',[
    validateJWT,
    check('category','no has enviado un nombre de categoria valido').notEmpty(),
    validate
],postCategories)

router.put('/:id',[
    check ('id').isMongoId()] ,
    putCategories)

router.delete('/:id', [
    check ('id','EL ID solicitado no es valido'). isMongoId(), validate], deleteCategories)

module.exports=router