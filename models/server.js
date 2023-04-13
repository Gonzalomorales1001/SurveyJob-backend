const express = require('express') //importamos express
const cors = require('cors')
const {DBconnection}=require('../config/config')

class Server{
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.autenPath="/api/auten"
       // this.usuarioPath="/api/usuarios"

        this.connectDB()
        this.middlewares()
        this.routes()
    }
    async connectDB(){
        await DBconnection()
    }
    middlewares(){
        //CORS
        this.app.use(cors())

        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.autenPath,require("../routes/auten"))
        //this.app.use(this.usuarioPath,require("../routes/usuarios"))

    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server Started (port ${this.port})`)
        })
    }
}

module.exports=Server