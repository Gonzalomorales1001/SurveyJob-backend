const {Router}=require('express')
const {getCategories,getCategoryById,postCategories,putCategories,deleteCategories}=require('../controllers/categories')

const {check}=require('express-validator')
const {validate}=require('../validations/validate')
const { validateJWT } = require('../validations/validate-jwt')
const { adminRole } = require('../validations/roles-validate')

const router=Router()

router.get('/',getCategories)

router.get('/:id',[],getCategoryById)

router.post('/',[
    validateJWT,
    validate
],postCategories)

router.put('/',putCategories)

router.delete('/',deleteCategories)

module.exports=router