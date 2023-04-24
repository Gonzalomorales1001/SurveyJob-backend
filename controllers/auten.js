const {response,request}=require("express")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const nodemailer=require('nodemailer')
const { generarJWT } = require("../helpers/generar-jwt")


const login = async (req=request,res=response) =>{
    try {
        const {email,password}=req.body
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
                msg:"La contraseña es incorrecta"
            })
        }

        //Si todo esta correcto, generar el token
        const token = await generarJWT(user.id)

        res.json({
           msg: "Inicio de sesión correcto, token generado!",
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

const forgottenPassword=async(req=request,res=response)=>{
    try {
        const {email}=req.body
        const user =await User.findOne({email}) 
        //Verificar si el correo existe
        if (!user||!user.status) {
            return res.status(400).json({
                msg: "El correo ingresado no existe o no se encuentra disponible"
            })
        }
        //Si todo esta correcto, generar el token
        const token = await generarJWT(user.id)

        user.resetPasswordToken=token
        
        const transport={
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        }

        const mailOptions = {
            to: email,
            from: process.env.EMAIL,
            subject: 'Solicitud de restablecimiento de contraseña - SurveyJob',
            text: `Has recibido este correo electrónico porque se ha solicitado el restablecimiento de la contraseña de tu cuenta de SurveyJob.\n\n
                Haz clic en el siguiente enlace o pégalo en tu navegador para completar el proceso:\n\n
                ${req.headers.host}/api/auten/reset-password/${token}\n\n
                Si no has solicitado esto, ignora este correo.\n`,
          };

        const transporter=nodemailer.createTransport(transport)
        
        await transporter.sendMail(mailOptions)
        
        await user.save()

        return res.status(202).json({
            "msg":"El correo ha sido enviado con éxito!",
            "New Password Token":token
        })
        
    } catch (err) {
        return res.status(500).json({
            "msg":"Hubo un problema!, ponte en contacto con el administrador",
            "error details":err
        })
    }
}

const newPassword=async(req=request,res=response)=>{
    try {
        const token=req.params.token
        
        if(!token){
            return res.status(400).json({
                "msg":"token no válido"
            })
        }
    
        const userFoundByPasswordResetToken=await User.findOne({resetPasswordToken:token})
        const id=userFoundByPasswordResetToken._id
        
        let password=req.body.password
        
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password, salt)
        
        password=hash
        let resetPasswordToken=""

        data={password,resetPasswordToken}
    
        const updatedUser= await User.findByIdAndUpdate(id,data,{new:true})
    
        return res.json({
            "msg":`La contraseña de ${updatedUser.username} ha sido actualizada con éxito!`
        })
    } catch (err) {
        return res.status(500).json({
            "msg":"Ha ocurrido un error a la hora de procesar tu solicitud, ponte en contacto con el administrador",
            "error-details":err
        })
    }
}


module.exports={
    login,
    forgottenPassword,
    newPassword,
}