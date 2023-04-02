const {Router}=require('express')

const {getCategories,postCategories,putCategories,deleteCategories}=require('../controllers/categories')

const router=Router()

router.get('/',getCategories)

router.post('/',postCategories)

router.put('/',putCategories)

router.delete('/',deleteCategories)

module.exports=router