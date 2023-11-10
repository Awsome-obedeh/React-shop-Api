const mongoose =require('mongoose')

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },

    desc:{
        type:String,
        required:true,
        
    },

    img:{
        type:String,
        required:true,
    },
    categories:{
        type:Boolean,
        Array,
    },
    size:{
        type:Boolean,
        default:false
    },
    
    color:{
        type:Boolean,
        default:false
    },
    price:{
        type:Number,
        required:true
    },

    

    
    
},// mongoDb default timestamps, will give us createdAt and updatedAt
{timestamps:true}
)

module.exports=mongoose.model('Poduct', productSchema)