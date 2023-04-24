const {Schema,model}=require('mongoose')

const UserSchema=Schema({
    username:{
        type: String,
        required: [true,"Invalid Name"],
    },
    email:{
        type: String,
        required: [true,"Mail is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    img:{
        type: String,
    },
    admin:{
        type:Boolean,
        default:false,
        required:true
    },
    status:{
        type: Boolean,
        default: true,
    },
    resetPasswordToken:{
        type:String,
        default: ""
    }
})


UserSchema.methods.toJSON=function(){
    const {__v,password,_id,resetPasswordToken,...userdata}=this.toObject()
    userdata.userID=_id
    return userdata
}

module.exports=model('User',UserSchema)