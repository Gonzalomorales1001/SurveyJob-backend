const {request,response}=require('express')

const isValidQuestion=(req=request,res=response)=>{
    const {Question}=require('../models/surveyModel')

    const {questions}=req.body

    //verifico que en el arreglo no hayan objetos vacíos

    // const isEmpty = questions.some((obj) => Object.keys(obj).length === 0);
    // if (isEmpty) {
    //   throw new Error('El arreglo "questions" no puede tener objetos vacíos');
    // }
    
}

module.exports={
    isValidQuestion,
}