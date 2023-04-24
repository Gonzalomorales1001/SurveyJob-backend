const express = require("express")
const {check} = require("express-validator")
const {validate} = require("../validations/validate")
const { login,forgottenPassword,newPassword } = require("../controllers/auten")

const router = express.Router()

router.post("/login",[
    check("email","El correo ingresado no es valido").isEmail(),
    check("password","La contraseña es obligatoria").notEmpty(),
    validate
], login)

router.post('/forgotten-password',[
    check('email','No has enviado un email válido').isEmail(),
    validate
],forgottenPassword)

router.put('/reset-password/:token',[
    check('password','La contraseña nueva no puede estar vacía').notEmpty(),
    check('password','La contraseña debe tener almenos 8 carácteres, letras mayúsculas, minúsculas, numeros y símbolos').isStrongPassword(),
    validate
],newPassword)



module.exports=router