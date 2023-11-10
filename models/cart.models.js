const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
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
},// mongoDb default timestamps, will give us createdAt and updatedAt
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)