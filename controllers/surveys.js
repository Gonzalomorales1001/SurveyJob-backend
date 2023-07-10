const {response,request}=require('express')
const {Survey,Question,Answer}=require('../models/surveyModel')
const Category=require('../models/categoryModel')

const getSurveys=async(req=request,res=response)=>{
    const {since=0,limit=5, userId}=req.query
    const statusTrue={status:true}

    if (userId) {
        var [surveys,total]=await Promise.all([
        Survey.find(statusTrue).where("owner").equals(userId).skip(since).limit(limit) //.populate('user','name email'),
        ,Survey.countDocuments(statusTrue).where("owner").equals(userId)
        ])
    
    } else {
        var [surveys,total]=await Promise.all([
        Survey.find(statusTrue).skip(since).limit(limit) //.populate('user','name email'),
        ,Survey.countDocuments(statusTrue)
        ])
    
    }

    res.json({
        surveys,
        "total":total,
    })
}

const getSurveyByID=async(req=request,res=response)=>{
    const {id}=req.params
    //eliminar validacion cuando tengamos las validaciones de la base de datos (juan)
    const surveyFoundByID=await Survey.findById(id)

    res.json({
        "msg":"Encuesta encontrada",
        surveyFoundByID,
    })
}

const postSurveys=async(req=request,res=response)=>{
    let {title,questions,category,description,public,anonymous,color}=req.body

    let owner=req.user._id
    if(!owner){return res.status(500).json({"msg":"Usuario no identificado"})}

    const validCategory=await Category.findOne({category:category})
    if(!validCategory){
        return res.status(400).json({
            "msg":"No asignaste una categoría existente"
        })
    }

    //creando instancias por cada pregunta recibida en request
    const surveyQuestions=[]
    questions.forEach((question)=>surveyQuestions.push(new Question(question)))
    //reasignando nuevos valores a variables
    questions=surveyQuestions
    category=category?.toUpperCase()

    //creando nueva encuesta
    const newSurvey= new Survey({title,questions,category,description,owner,anonymous,public,color})

    //a revisar (!!)
    try {
        await newSurvey.save()
    } catch (err) {
        return res.status(400).json({
            "msg":"No has enviado pregunta(s) válida(s)",
            err
        })
    }
    // await newSurvey.save()

    res.json({
        "msg":`La encuesta de ${req.user.username} ha sido creada con éxito!`,
        newSurvey,
    })
}

const putSurveys=async(req=request,res=response)=>{
    const {id}=req.params
    let {title,category,questions,color}=req.body
        const surveyFoundByID=await Survey.findById(id)

    category=category.toUpperCase()

    const data={
        title,
        category,
        questions,
        color
    }

    const updatedSurveyData= await Survey.findByIdAndUpdate(id,data,{new:true})
    
    res.json({
        "msg":"Encuesta actualizada con éxito!",
        updatedSurveyData,
    })
}

const addNewAnswer=async(req=request,res=response)=>{
    const {id}=req.params
    const answersSent=req.body.answers

    const surveyFoundByID=await Survey.findById(id)

    const newAnswer=await new Answer({survey:surveyFoundByID.surveyID,content:answersSent})

    surveyFoundByID.answers.push(newAnswer)

    await Survey.findByIdAndUpdate(id,{answers:surveyFoundByID.answers},{new:true})

    res.json({
        "msg":"La respuesta ha sido agregada con éxito!",
        newAnswer
    })

}

const deleteSurveys=async(req=request,res=response)=>{
    const {id}=req.params

    const surveyFoundByID=await Survey.findById(id)

    await Survey.findByIdAndUpdate(id,{status:false},{new:true})

    res.json({
        "msg":"La encuesta ha sido eliminada correctamente",
        surveyFoundByID
    })
}

module.exports={
    getSurveys,
    getSurveyByID,
    postSurveys,
    putSurveys,
    addNewAnswer,
    deleteSurveys,
}