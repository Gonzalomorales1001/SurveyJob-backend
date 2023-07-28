const jwt=require("jsonwebtoken")

const generarJWT = (uid) =>{
    return new Promise((resolve,reject)=>{
        //crear payload
        const payload ={uid}

        //generar jwt

        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"12h"
        },(err,token)=>{
            if (err) {
                console.log(err)
                reject("Error a la hora de generar token")
            }else{
                resolve(token)
            }
        })
    })

}


module.exports={
    generarJWT
}