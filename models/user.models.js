const mongoose =require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    
    
},

// mongoDb default timestamps, will give us createdAt and updatedAt time
{timestamps:true}
)

module.exports=mongoose.model('User', userSchema)