const {response,request}=require("express")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { generarJWT } = require("../helpers/generar-jwt")

const login = async (req=request,res=response) =>{

    const {email,password}=req.body

    try {
        const user =await User.findOne({email}) 
        //Verificar si el correo existe
        if (!user) {
            return res.status(400).json({
                msg: "El correo ingresado no existe"
            })
        }

        //Verificar si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                msg:"Mail or pasword incorrect"
            })
        }


        //Verificar la contraseña
const validatePasword=bcrypt.compareSync(password,user.password)

if (!validatePasword) {
    return res.status(400).json({
        msg:"Email or pasword correct /pasword incorrect"
    })
}

        //Generar el token
        const token = await generarJWT(user.id)
 

    res.json({
       msg: "login walking",
       user,
       token
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Ha ocurrido un error, ponte en contacto con el administrador"
        })
    }



}


module.exports={
    login
}