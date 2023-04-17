const {Router} = require("express")
const {check} = require("express-validator")
const {validate} = require("../validations/validate")
const { login } = require("../controllers/auten")

const router = Router()

router.post("/login",[
    check("email","correo ingresado no es valido").isEmail(),
    check("password","La contraseña es obligatoria").notEmpty(),
    validate
], login)


module.exports=router