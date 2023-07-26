const { Router } = require('express');
const { search } = require('../controllers/search');
const { check } = require('express-validator');
const { validate } = require('../validations/validate');
const { isValidCollection } = require('../validations/customValidations');

const router = Router();

router.get('/:collection/:value',[
    check('collection','Debes especificar la colección').notEmpty(),
    check('collection').custom(isValidCollection),
    check('value','No has mandado el valor a buscar').notEmpty(),
    validate
],search)

module.exports = router;