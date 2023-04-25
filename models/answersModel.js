const {Schema,model,SchemaTypes}=require('mongoose')

const AnswerSchema=Schema({
    survey:{
        type:SchemaTypes.ObjectId,
        ref:'Surveys',
        required:[true,'No survey']
    },
    content:{
        type:Array,
        required:[true, 'No content answer']
    }
})

module.exports=model(AnswerSchema)