const {response,request}=require('express')
const {Survey,Question}=require('../models/surveyModel')

const getSurveys=(req=request,res=response)=>{
    res.json({
        "msg":"get Surveys habilitado"
    })
}

const getSurveyByID=(req=request,res=response)=>{
    res.json({
        "msg":"get survey by id habilitado"
    })
}

const postSurveys=async(req=request,res=response)=>{
    let {title,questions,anonymous,color}=req.body
    
    if(!questions){
        return res.status(400).json({
            "msg":"No has enviado ninguna pregunta"
        })
    }
    
    const surveyQuestions=[]
    questions.forEach((question)=>surveyQuestions.push(new Question(question)))
    questions=surveyQuestions

    const newSurvey= new Survey({title,questions,anonymous,color})

    await newSurvey.save()

    res.json({
        "msg":"post surveys habilitado",
        newSurvey,
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
    getSurveyByID,
    postSurveys,
    putSurveys,
    deleteSurveys,
}