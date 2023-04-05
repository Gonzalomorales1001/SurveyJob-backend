const {response,request}=require("express")


const login = (req=request,res=response) =>{

    const {correo,pasword}=req.body

    try {
        
        
    res.json({
       msg: "login andando",
       correo,
       pasword
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