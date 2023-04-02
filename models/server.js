const express = require('express') //importamos express
const cors = require('cors')
const {DBconnection}=require('../config/config')

class Server{
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.categoryPath='/api/categories'
        this.usersPath='/api/users'
        this.surveysPath='/api/surveys'

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
        this.app.use(this.categoryPath, require('../routes/categories'))
        this.app.use(this.usersPath, require('../routes/users'))
        this.app.use(this.surveysPath, require('../routes/surveys'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server Started (port ${this.port})`)
        })
    }
}

module.exports=Server