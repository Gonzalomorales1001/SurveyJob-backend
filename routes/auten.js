const {Router} = require("express")
const {check} = require("express-validator")
const { login } = require("../controllers/auten")

const router = Router()

router.post("/login",[
    check("correo","correo ingresado no es valido").isEmail(),
    check("pasword","La contraseña es obligatoria").notEmpty,
    //importar validarCampos
], login)


module.exports=router