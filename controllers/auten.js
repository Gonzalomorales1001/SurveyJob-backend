const {response,request}=require("express")
const Usuario = require("../models/usuario")
const bcrypt = require("bcryptjs")
const { generarJWT } = require("../helpers/generar-jwt")

const login = async (req=request,res=response) =>{

    const {correo,pasword}=req.body

    try {
        const usuario =await Usuario.findOne({correo})
        //Verificar si el correo existe
        if (!usuario) {
            return res.status(400).json({
                msg: "El correo ingresado no existe"
            })
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"El correo o pasword ingresado no es correcto"
            })
        }


        //Verificar la contraseña
const validarPasword=bcrypt.compareSync(pasword,usuario.pasword)

if (!validarPasword) {
    return res.status(400).json({
        msg:"El correo o pasword ingresado no es correcto /pasword incorrecto"
    })
}

        //Generar el token
        const token = await generarJWT(usuario.id)
 

    res.json({
       msg: "login andando",
       token
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg:"Ocurrio un problema. Hable con el administrador"
        })
    }



}


module.exports={
    login
}