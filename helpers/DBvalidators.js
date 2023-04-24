const User=require('../models/userModel')
// const Category=require('../models/category')

const userEmailAlreadyInUse=async(emailReq)=>{
    const emailInUse=await User.findOne({email:emailReq})
    if (emailInUse){
        throw new Error(`Ese email ya esta en uso`)
    }
}

const userFoundByEmail=async(emailReq)=>{
    const emailInUse=await User.findOne({email:emailReq})
    if (!emailInUse){
        throw new Error(`No ha sido posible encontrar este email`)
    }
}

const idUserNotFound=async(idReq)=>{
    const userFoundByID=await User.findById(idReq)
    if(!userFoundByID){
        throw new Error(`The user doesn't exist`)
    }
}

// const idCategoryNotFound=async(idReq)=>{
//     const categoryFoundByID=await Category.findById(idReq)
//     if(!categoryFoundByID){
//         throw new Error(`The category doesn't exist`)
//     }
// }

module.exports={
    userEmailAlreadyInUse,
    idUserNotFound,
    // idCategoryNotFound,
}