const express = require('express');
const bcrypt=require('bcryptjs')
const { verifyToken,verifyTokenAndAuth } = require('../controllers/auth.controller');
const router = express.Router();
const User=require('./../models/user.models')

// router to update a user
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    if(req.body.password){
        const hashedPassword=bcrypt.hashSync(req.body.password);

    }
    try{
        const {id}=req.params
        const updatedUser=await User.findByIdAndUpdate(id,
            {$set:req.body} ,
            {new:true}   
        );
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json('server Error')
        console.log(err);
    }

    // try {
    //     const {id} = req.params
    //     // check to see if  token belongs to  user or admin
    //     if (req.user.id === id || req.user.isAdmin) {
    //         const {password}=req.body
    //         if (password) {
    //             hashedPassword=bcrypt.hashSync(password)
    //         }

    //         // // one way of doing it
    //         // const updatedUser=await User.findById(id);
    //         // updatedUser.username=username;
    //         // updatedUser.password=hashedPassword;
    //         // updatedUser.email=email;

    //         // await user.save();

    //         // another way of doing it
    //         const user=User.findByIdAndUpdate(id,{
    //             $set:req.body,
    //             // set new to true to return the new updated user
    //         },{new:true})
    //         res.status(200).json(updatedUser)

    //     }
    //     else {
    //         res.status(403).json("Unauthorized operation")
    //     }
    // }
    // catch(error){
    //     res.status(500).json("server error")
    //     console.log(error);
    // }
})

module.exports = router