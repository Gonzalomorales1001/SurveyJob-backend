const {Schema,model}=require('mongoose')

const SurveySchema=Schema({
    name:{
        type: String,
        required: [true,"Invalid Name"],
    },
    status:{
        type: Boolean,
        default: true,
    },
    questions:{
        type: Array,
        default: [],
        required: true
    },
    answers:{
        type: Array,
        default: [],
        required: true
    }
})


SurveySchema.methods.toJSON=function(){
    const {__v,_id,...surveyData}=this.toObject()
    surveyData.userID=_id
    return surveyData
}

module.exports=model('User',UserSchema)