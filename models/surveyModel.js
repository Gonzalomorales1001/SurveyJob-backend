const {Schema,model,SchemaTypes}=require('mongoose')

const QuestionSchema=Schema({
    content:{
        type:String,
        required:[true,'No content question']
    },
    questionType:{
        type:String,
        default: 'TEXT',
        enum:['TEXT','RADIO','CHECKBOX'],
        required:[true,'Invalid type question']
    },
    options:{
        type:Array,
    },
})

const AnswerSchema=Schema({
    survey:{
        type:SchemaTypes.ObjectId,
        ref:'Survey',
        required:[true,'No survey']
    },
    content:{
        type:Array,
        required:[true, 'No content answer']
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
    description:{
        type: String,
        required: [true, "Invalid Description"]
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
        type:Array,
        default:[],
    },
    owner:{
        type:SchemaTypes.ObjectId,
        ref:'User',
        required:true
    },
    public:{
        type:Boolean,
        default:true,
        required:true
    },

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
const Answer=model('Answer',AnswerSchema)

module.exports={
    Survey,
    Question,
    Answer
}
