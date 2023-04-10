const {Schema,model}= require("mongoose")

const usuarioSchema = Schema({
    nombre :{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    correo:{
        type:String,
        required:[true,"El correo es obligatorio"],
        unique:true
    },
    pasword:{
        type:String,
        required:[true,"El pasword es obligatorio"]
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:["USER_ROLE","ADMIN_ROLE"]
    },
    estado:{
        type:Boolean,
        default:true
    }

})


module.exports=model("Usuario",usuarioSchema)