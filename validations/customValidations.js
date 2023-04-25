const {request,response}=require('express')

const User=require('../models/userModel')
const Category=require('../models/categoryModel')
const {Survey}=require('../models/surveyModel')

const isValidCategory=async(categoryReq)=>{
    const categoryFound=await Category.find({category:categoryReq})

    if(!categoryFound){
        throw new Error(`La categoría "${categoryReq}" no existe. Prueba poniendo una categoría real`)
    }

}

const surveyFound=async(requestedSurveyID)=>{
    const surveyFoundByID= await Survey.findById(requestedSurveyID)

    if(!surveyFoundByID||!surveyFoundByID.status){
        throw new Error(`Esa encuesta no existe o no se encuentra disponible`)
    }
}

module.exports={
    isValidCategory,
    surveyFound
}