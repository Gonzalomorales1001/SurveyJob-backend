const {Schema,model}=require('mongoose')

const QuestionSchema=Schema({
    content:{
        type:String,
        required:[true,'No content question']
    },
    questionType:{
        type:String,
        default: 'TEXT',
        enum:['TEXT','SELECT','CHECKBOX'],
        required:[true,'Invalid type quesiton']
    },
    options:{
        type:Array,
    }
})

const SurveySchema=Schema({
    title:{
        type: String,
        required: [true,"Invalid Survey Title"],
    },
    category:{
        type: String,
        required: [true, "Invalid Category"],
        default: 'OTROS'
    },
    status:{
        type: Boolean,
        default: true,
    },
    questions:{
        type: [QuestionSchema],
        default: [],
        required: [true,'Invalid Question Schema']
    },
    answers:{
        type: Array,
        default: [],
    },
    anonymous:{
        type: Boolean,
        default: true,
        required: true,
    },
    color:{
        type: String,
        default: "#00FFBB"
    }
})

SurveySchema.methods.toJSON=function(){
    const {__v,_id,...surveyData}=this.toObject()
    surveyData.surveyID=_id
    return surveyData
}

QuestionSchema.methods.toJSON=function(){
    const {_id,...questionData}=this.toObject()
    questionData.questionID=_id
    return questionData
}

const Survey=model('Survey',SurveySchema)
const Question=model('Question',QuestionSchema)

module.exports={
    Survey,
    Question
}
