const {response,request}=require('express')

const getSurveys=(req=request,res=response)=>{
    res.json({
        "msg":"get Surveys habilitado"
    })
}

const postSurveys=(req=request,res=response)=>{
    res.json({
        "msg":"post Surveys habilitado"
    })
}

const putSurveys=(req=request,res=response)=>{
    res.json({
        "msg":"put Surveys habilitado"
    })
}

const deleteSurveys=(req=request,res=response)=>{
    res.json({
        "msg":"delete Surveys habilitado"
    })
}

module.exports={
    getSurveys,
    postSurveys,
    putSurveys,
    deleteSurveys,
}