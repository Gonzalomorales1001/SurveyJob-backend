const {response,request}=require("express")


const adminRole = (req=request,res=response,next) => {
if (!req.usuario) {
    return res.status(500).json({
        msg:"Es necesario validar primero el token para validar el usuario"
    })
}

const {admin,username}=req.user

if (admin !== true) {
    return res.status(401).json({
        msg:`${username} not administrator`
    })
}

next()
}



module.exports={
    adminRole
}