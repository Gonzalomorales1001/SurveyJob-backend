const {response,request}=require('express')

const bcrypt=require('bcryptjs')

const getUsers=(req=request,res=response)=>{
    res.json({
        "msg":"get Users habilitado"
    })
}

const postUsers=(req=request,res=response)=>{
    res.json({
        "msg":"post Users habilitado"
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