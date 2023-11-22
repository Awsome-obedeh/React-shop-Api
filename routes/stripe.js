require('dotenv').config()
const express= require('express');
const router=express.Router();
const stripe=require("stripe")(process.env.STRIPE_KEY)

// create stripe charges

router.post('/payment', async (req,body)=>{
    stripe.charges.create({
        source:req.body.body.tokenId,
        amount:req.body.amount,
        currency:"ngn",
    },
    (stripErr,stripeRes)=>{
        stripErr ? res.status(500).json(stripErr) : res.status(200).json(stripeRes)
    }
    )
})


module.exports=router