const {response,request}=require("express")


const adminRole = (req=request,res=response,next) => {
if (!req.user) {
    return res.status(500).json({
        msg:"Es necesario estar logeado"
    })
}

const {admin,username}=req.user

if (!admin) {
    return res.status(401).json({
        msg:`Se requiere permisos de administrador para llevar esta acción a cabo. Ponte en contacto con rsurveyjob@gmail.com`
    })
}

next()
}



module.exports={
    adminRole
}