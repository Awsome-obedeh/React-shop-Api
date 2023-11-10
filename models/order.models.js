const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,

    },



    products: [
        {
            producId:{
                type:String,

            },
            qunatity:{
                type:Number,
                default:1
            }
        }
        
    ],

    amount:{
        type:String,
        required:true,
    },

   address:{
        // becasue stripe library will take user address,city, we will set teh address to receive an object
        type:Object,
        required:true
    },

    status:{
        type:String,
        default:"pending"
    }
},// mongoDb default timestamps, will give us createdAt and updatedAt
    { timestamps: true }
)

module.exports = mongoose.model('Order', ordSchema)