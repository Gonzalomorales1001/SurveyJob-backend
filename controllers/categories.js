const {response,request}=require('express')
const Category=require('../models/categoryModel')


const getCategories=async(req=request,res=response)=>{
    const {since=0,limit=5}=req.query

    const [Categories,total]=await Promise.all([Category.find({status:true}).skip(since).limit(limit).populate('user','username'),Category.countDocuments()])
    
    res.json({
        "msg":"Categorías disponibles",
        Categories, 
        total,
        "showing": Categories.length
    })
}

const getCategoryById=async(req=request,res=response)=>{
    const {id}=req.params

    const categoryFoundById=await Category.findById(id)

    if(!categoryFoundById||!categoryFoundById.status){return res.status(404).json({
        "msg":"La categoria no se encuentra"
    })}

    res.json({
        "msg":"Categoria encontrada",
        categoryFoundById
    })
}

const postCategories=async(req=request,res=response)=>{
    let {category,status}=req.body
    category=category.toUpperCase()
    let user=req.user._id

    const newCategory =new Category({category,user})
    await newCategory.save()


    res.json({
        "msg":"categoria creada con exito",
        newCategory
    })
}

const putCategories=async(req=request,res=response)=>{
    const {id}=req.params

    const categoryFoundById=await Category.findById(id) 
    if(!categoryFoundById||!categoryFoundById.status){
        return res.status(404).json({
            "msg":"La categoria no se encuentra"
        })
    }

        let {category}=req.body
        
        const data={category}

        const UpdateCategory= await Category.findByIdAndUpdate(id,data,{new: data})


    res.json({
        "msg":"Categoria Actualizada", UpdateCategory
    })
}

const deleteCategories=async(req=request,res=response)=>{
    const {id}=req.params

    const CategoryAuten =req.category
    const categoryFoundById=await Category.findById(id) 
    if(!categoryFoundById||!categoryFoundById.status){
        return res.status(404).json({"msg":"La categoria no se encuentra"})}

        const categoryDelete= await Category.findByIdAndUpdate(id,{status:false},{new: true})

    res.json({
        "msg":"categoria eliminada", categoryDelete, CategoryAuten
    })
}

module.exports={
    getCategories,
    getCategoryById,
    postCategories,
    putCategories,
    deleteCategories,
}