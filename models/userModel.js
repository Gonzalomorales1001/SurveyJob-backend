const {Schema,model}=require('mongoose')

const UserSchema=Schema({
    name:{
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
    rol:{
        type: String,
        required: [true],
        // enum:["USER","ADMIN"],
        default:"USER"
    },
    status:{
        type: Boolean,
        default: true,
    }
})


UserSchema.methods.toJSON=function(){
    const {__v,password,_id,...userdata}=this.toObject()
    userdata.userID=_id
    return userdata
}

module.exports=model('User',UserSchema)