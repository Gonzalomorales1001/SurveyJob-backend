const {Router}=require('express')

//survey validations
const {check, checkSchema, body}=require('express-validator')
const {validate}=require('../validations/validate')

const {isValidQuestion}=require('../validations/customValidations')
const { validateJWT } = require('../validations/validate-jwt')

const {isValidCategory}=require('../validations/customValidations')

//survey controller functions
const {getSurveys,getSurveyByID,postSurveys,putSurveys,addAnswer,deleteSurveys}=require('../controllers/surveys')

const router=Router()

router.get('/',getSurveys)

router.get('/:id',[
    check('id','El ID solicitado no es un ID válido').isMongoId(),
    validate
],getSurveyByID)

router.post('/',[
    validateJWT,

    check('title','Porfavor, envia el título de la encuesta.').notEmpty(),
    check('title','El título de la encuesta debe tener almenos 5 carácteres').isLength({min:5}),
    check('category','La categoría no puede estar vacía').notEmpty(),
    check('category','La categoría debe ser enviada en mayúsculas').isUppercase(),
    check('questions','No puedes enviar una encuesta sin preguntas.').notEmpty(),
    check('questions','Las preguntas enviadas deben estar como un arreglo de objetos siendo cada objeto una pregunta.').isArray().notEmpty(),
    //validar que 'questions' sea un schema de QuestionSchema (!!!!! Ir al trycatch del controlador donde se envian los datos a la DB)
    check('public','No has definido si la encuesta sera visible').notEmpty(),
    check('anonymous','No has definido si la encuesta es anónima o no (true/false)').isBoolean(),
    validate
],postSurveys)

router.put('/:id',[
    validateJWT,
    check('id','El ID solicitado no es un ID válido').isMongoId(),
    validate
],putSurveys)

router.put('/answer/:id',[
    check('id','El ID solicitado no es un ID válido').isMongoId(),
    validate
],addAnswer)

router.delete('/:id',[
    validateJWT,
    check('id','El ID solicitado no es un ID válido').isMongoId(),
    validate
],deleteSurveys)

module.exports=router