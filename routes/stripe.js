require('dotenv').config()
const express= require('express');
const Router=express.Router();
const stripe=require("stripe")(process.env.STRIPE_KEY)



module.exports=router