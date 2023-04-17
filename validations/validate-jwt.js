const {response,request}=require("express")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const validateJWT=async (req=request,res=response,next)=>{
    const token = req.header("x-token")

    //preguntar si hay token
    if (!token) {
        return res.status(401).json({
            msg:"No token"
        })
    }

    try {
        //verificar token y obtener uid
      const {uid} =  jwt.verify(token,process.env.JWT_SECRET)

      //obtener datos del usuario
      const user =await User.findById(uid)

      //validar si existe usuario
      if (!user) {
     res.status(401).json({
        msg:"El usuario no existe"
     })   

     //verificar si usuario esta activo
     if (!user.status) {
        res.status(401).json({
            msg:"Usuario inactivo"
         })   
     }

      }
      req.user=user

     next()
        
    } catch (error) {
        res.status(401).json({
            msg:"Invalid token"
        })
    }
}


module.exports = {
    validateJWT
}