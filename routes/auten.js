const {Router} = require("express")
const { login } = require("../controllers/auten")

const router = Router()

router.post("/login",login)


module.exports=router