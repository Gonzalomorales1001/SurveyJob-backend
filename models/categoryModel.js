const {Schema,model, SchemaTypes}=require('mongoose')

const CategorySchema=Schema({
    category:{
        type:String,
        required:[true,"Please, send a name for category"],
        unique:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    },
    user:{
        type:SchemaTypes.ObjectId,
        ref:"User",
        required:true,
    }
})

CategorySchema.methods.toJSON=function(){
    const {__v,_id,...category}=this.toObject()
    category.catID=_id
    return category
}

module.exports=model('Category',CategorySchema)