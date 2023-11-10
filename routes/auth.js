const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs')
const User = require('./../models/user.models');
const { accessToken } = require('../controllers/auth.controller');


router.post('/register', async (req, res) => {
    try {
        
        const { username, email, password } = req.body;
        // validate
        if(!username){
            return res.status(400).json({err:"Enter username"});
            
        }
        if(!email){
            return res.status(400).json({err:"Enter email"});

        }
        if(!password){
            return res.status(400).json({err:"Enter password"});

        }
        const hashPassword=bcrypt.hashSync(password)
        const newUser = new User({
            username: username,
            email, email,
            password: hashPassword
        })
        await newUser.save();
        res.status(200).json({msg:"user created succesfully"})
    }

    catch (error) {
        console.log(`server error ${error}`);
        res.status(500).json({err:"server error"})
    }

})

router.post('/login', async (req,res)=>{
    try {
        let {username,userPassword}=req.body
        userPassword=String(userPassword);

        if(!username){
            return res.status(400).json({msg:"enter username to login"})
        }
        if(!userPassword){
            return res.status(400).json({msg:"enter password to login"})
        }

        const user=await User.findOne({username:username})
        if(!user){
            return res.status(400).json({err:"Invalid Credentials"})
        }

        const userpassword=bcrypt.compareSync(userPassword, user.password);
        if(!userpassword){
            return res.status(400).json({err:"Invalid Credentials"});
        }
        // to send user data to the front end without the password
        const {password, ...others}=user._doc
        token=accessToken(user._id,user.isAdmin);

        res.status(200).json({...others,token})
        
    } catch (error) {
        res.status(500).json({msg:"server error"})
        console.log(error);
    }
})

module.exports = router