const {request,response}=require('express')

const User=require('../models/userModel');
const Category=require('../models/categoryModel');
const {Survey}=require('../models/surveyModel');

const mongoose = require('mongoose');

const isValidCategory=async(categoryReq)=>{
    const categoryFound=await Category.find({category:categoryReq});

    if(!categoryFound){
        throw new Error(`La categoría "${categoryReq}" no existe. Prueba poniendo una categoría real`);
    }
}

const surveyFound=async(requestedSurveyID)=>{
    const surveyFoundByID= await Survey.findById(requestedSurveyID);

    if(!surveyFoundByID){
        throw new Error(`Esa encuesta no existe`);
    }
}

const activeSurvey=async(requestedSurveyID)=>{
    const surveyFoundByID=await Survey.findById(requestedSurveyID);

    if(!surveyFoundByID.status){
        throw new Error('Encuesta no disponible');
    }
}

const isValidCollection = async (collectionReq) => {
    const collections = mongoose.connection.collections;
    const collectionNames = Object.keys(collections);

    if(!collectionNames.includes(collectionReq)){
        throw new Error('Esa collecion no existe');
    }
}

module.exports={
    isValidCategory,
    surveyFound,
    activeSurvey,
    isValidCollection
}