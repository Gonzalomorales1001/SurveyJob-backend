const {response,request}=require('express')

const getCategories=(req=request,res=response)=>{
    res.json({
        "msg":"get categories habilitado"
    })
}

const postCategories=(req=request,res=response)=>{
    res.json({
        "msg":"post categories habilitado"
    })
}

const putCategories=(req=request,res=response)=>{
    res.json({
        "msg":"put categories habilitado"
    })
}

const deleteCategories=(req=request,res=response)=>{
    res.json({
        "msg":"delete categories habilitado"
    })
}

module.exports={
    getCategories,
    postCategories,
    putCategories,
    deleteCategories,
}