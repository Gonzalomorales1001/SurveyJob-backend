const {Router} = require("express")

const router = Router()

router.get("/",usuariosGet)


module.exports=router