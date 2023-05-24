const {response,request}=require('express')
const User=require('../models/userModel')
const {Survey}=require('../models/surveyModel')

const bcrypt=require('bcryptjs')

const getUsers=async(req=request,res=response)=>{
    const {since=0,limit=10}=req.query

    const statusTrue={status:true}

    const [Users,total]=await Promise.all([
        User.find(statusTrue).skip(since).limit(limit) //.populate('user','name email'),
        ,User.countDocuments(statusTrue)
    ])

    res.json({
        "msg":"get Users habilitado",
        Users,
        "total":total
    })
}

const getUserByID=async(req=request,res=response)=>{
    const {id}=req.params

    //eliminar validacion cuando tengamos las validaciones de la base de datos (juan)
    const userFoundByID=await User.findById(id)

    if(!userFoundByID||!userFoundByID.status){
        return res.status(404).json({
            "msg":"El usuario no ha sido encontrado o no se encuentra disponible"
        })
    }

    // let userSurveys=await Survey.find({'owner.ownerID':id})

    let userSurveys=await Survey.find({owner:id})
    if(userSurveys.length===0){userSurveys='Este usuario no tiene encuestas creadas'}

    res.json({
        "msg":"Usuario encontrado",
        userFoundByID,
        "Created Surveys":userSurveys
    })
}

const postUsers=async(req=request,res=response)=>{
    let {username,email,password,admin,status}=req.body

    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password, salt)

    password=hash

    const newUser= new User({username,email,password,admin,status})

    await newUser.save()

    res.json({
        "msg":"Usuario registrado con éxito!",
        newUser,
    })
}

const putUsers=async(req=request,res=response)=>{
    const {id}=req.params

    const userFoundByID=await User.findById(id)

    if(!userFoundByID||!userFoundByID.status){
        return res.status(404).json({
            "msg":"El usuario no ha sido encontrado o no se encuentra disponible"
        })
    }

    let {username,email,password,admin,img}=req.body

    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password, salt)

    password=hash

    const data={username,email,password,admin,img}

    const updatedUser= await User.findByIdAndUpdate(id,data,{new:true})

    res.json({
        "msg":"Usuario actualizado con éxito!",
        updatedUser
    })
}

const deleteUsers=async(req=request,res=response)=>{
    const {id}=req.params

    const userAuten =req.user

    if(!userAuten.admin){
        return res.status(401).json({
            "msg":"No tienes permisos de administrador para hacer esto"
        })
    }

    const userFoundByID=await User.findById(id)

    if(!userFoundByID){
        return res.status(404).json({
            "msg":"El usuario no ha sido encontrado o no se encuentra disponible"
        })
    }

    const userDeleted= await User.findByIdAndUpdate(id,{status:false},{new:true})

    res.json({
        "msg":"Usuario eliminado con éxito!",
        userDeleted,
        userAuten
    })
}

module.exports={
    getUsers,
    getUserByID,
    postUsers,
    putUsers,
    deleteUsers,
}