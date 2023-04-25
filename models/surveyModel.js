const {Schema,model,SchemaTypes}=require('mongoose')

const QuestionSchema=Schema({
    content:{
        type:String,
        required:[true,'No content question']
    },
    questionType:{
        type:String,
        default: 'TEXT',
        enum:['TEXT','SELECT','CHECKBOX'],
        required:[true,'Invalid type question']
    },
    options:{
        type:Array,
    },
})

const AnswerSchema=Schema({
    content:{
        type:Array,
        required:[true,'No answer']
    },
    question:{
        type:SchemaTypes.ObjectId,
        ref:'Question',
        required:[true,'No question ID for this answer']
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
    owner:{
        type:SchemaTypes.ObjectId,
        ref:'User',
        required:true
    },
    answers:{
        type: [AnswerSchema],
        default: [],
        required: [true,'Invalid Answer Schema']
    },
    anonymous:{
        type: Boolean,
        default: true,
        required: true,
    },
    public:{
        type:Boolean,
        default:true,
        required:true
    },
    color:{
        type: String,
        default: "cyan"
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
