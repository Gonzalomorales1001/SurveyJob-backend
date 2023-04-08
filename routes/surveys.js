const {Router}=require('express')

//survey validations
const {check}=require('express-validator')
const {validate}=require('../validations/validate')

const {getSurveys,getSurveyByID,postSurveys,putSurveys,deleteSurveys}=require('../controllers/surveys')

const router=Router()

router.get('/',getSurveys)

router.get('/:id',getSurveyByID)

router.post('/',[
    //validar que este logeado
    //validar que sea un usuario apto (encuestador/admin)
    check('title','Porfavor, envia el nombre de la encuesta').notEmpty(),
    // validar que envie las preguntas (!)
    //validar que diga si es anonima o no  b
    validate
],postSurveys)

router.put('/',putSurveys)

router.delete('/',deleteSurveys)

module.exports=router