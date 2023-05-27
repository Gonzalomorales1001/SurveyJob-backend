const {response,request}=require("express")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
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

        const encodedToken=encodeURIComponent(token)
        const mailOptions = {
            to: email,
            from: process.env.EMAIL,
            subject: 'Solicitud de restablecimiento de contraseña - SurveyJob',
            html: `
            <div style="text-align: center;">
              <img src="https://i.postimg.cc/fbPJhw6c/Dark-Letter-Logo.png" alt="Logo de SurveyJob" width="150px">
              <h2 style="color: #333;">Solicitud de restablecimiento de contraseña</h2>
              <p style="color: #333;">
                Has recibido este correo electrónico porque se ha solicitado el restablecimiento de la contraseña de tu cuenta de SurveyJob.
              </p>
              <p style="color: #333;">
                Haz clic en el siguiente botón para completar el proceso:
              </p>
              <a href="https://surveyjob.netlify.app/reset-password/${encodedToken}" style="display: inline-block; background-color: #F0A500; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">Restablecer contraseña</a>
              <p style="color: #FF5555;">Si no has solicitado esto, ignora este correo.</p>
            </div>
          `,
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
                "msg":"El token no es válido"
            })
        }
        
        const validToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!validToken){
            return res.status(400).json({
                "msg":"El token ha expirado"
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