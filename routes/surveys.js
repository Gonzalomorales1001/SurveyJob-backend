const {Router}=require('express')
const {getSurveys,postSurveys,putSurveys,deleteSurveys}=require('../controllers/surveys')

const router=Router()

router.get('/',getSurveys)

router.post('/',postSurveys)

router.put('/',putSurveys)

router.delete('/',deleteSurveys)

module.exports=router