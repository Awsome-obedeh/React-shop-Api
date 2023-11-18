const express = require('express');
const bcrypt = require('bcryptjs')
const { verifyToken, verifyTokenAndAuth, verifyTokenAdmin } = require('../controllers/auth.controller');
const router = express.Router();
const User = require('./../models/user.models');
const userModels = require('./../models/user.models');

// router to update a user
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        const hashedPassword = bcrypt.hashSync(req.body.password);

    }
    try {
        const { id } = req.params
        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
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

// Delete method for admin
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json("user deleted successfully");


    } catch (err) {
        res.status(500).json("server Error")
        console.log(err);
    }
})

// get user
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password, ...others } = user._doc
        if (user) {
            res.status(200).json(others);
        } else {
            res.status(500).json("can't perform this operation now")
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json('server Error')
    }

})

// get all users
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let user = '';
        
        // const removePasswordKey = (array) => {
        //     return array.map(obj => {
        //       const { password, ...rest } = obj;
        //       return rest;
        //     });
        //   }
        // const user=query ? User.find().sort(_id).limit(5) :''
        if (query) {
            user = await User.find().sort({ _id: -1 }).limit(5)
            // const userResult=removePasswordKey(user)
            
            res.status(200).json(user)

        }
        else {
            user = await User.find()
           
            // const userResult=removePasswordKey(user)
             res.status(200).json(user)
            // const { password, ...others } = user._doc
           
        }
        ;
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error")
    }
})

// get user stats
router.get('/stats', verifyTokenAdmin, async (req, res) => {
    try {
        // getting user statistics using rge aggregate pipline
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        const userStats = await User.aggregate([
            // match records where created at is greater tha lastyear
            { $match: { createdAt: { $gte: lastYear } } },

            // spit out month numbers
            {
                $project: {
                    // take the month number from the createdAt field
                    month: { $month: "$createdAt" },
                },
            },

            // group fields by thier month and sum them
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(userStats)
    }


    catch (err) {
        console.log(err);
        res.status(500).json("Server Error"+ err)
    }
})
module.exports = router