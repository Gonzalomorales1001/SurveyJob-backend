const {response,request}=require('express')
const User=require('../models/userModel')

const bcrypt=require('bcryptjs')

const getUsers=(req=request,res=response)=>{
    res.json({
        "msg":"get Users habilitado"
    })
}

const postUsers=async(req=request,res=response)=>{
    let {name,email,password,rol,status}=req.body

    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(password, salt)

    password=hash

    const newUser= new User({name,email,password,rol,status})

    await newUser.save()

    res.json({
        "msg":"post Users habilitado",
        newUser,
    })
}

const putUsers=(req=request,res=response)=>{
    res.json({
        "msg":"put Users habilitado"
    })
}

const deleteUsers=(req=request,res=response)=>{
    res.json({
        "msg":"delete Users habilitado"
    })
}

module.exports={
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
}