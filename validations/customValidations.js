const {request,response}=require('express')

const User=require('../models/userModel')
const Category=require('../models/categoryModel')

const isValidCategory=async(categoryReq)=>{
    const categoryFound=await Category.find({category:categoryReq})

    if(!categoryFound){
        throw new Error(`La categoría "${categoryReq}" no existe. Prueba poniendo una categoría real`)
    }

}

module.exports={
    isValidCategory,
}