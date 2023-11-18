const express = require('express');
const router = express.Router();
const Cart = require('./../models/cart.models');
const { verifyToken, verifyTokenAdmin, verifyTokenAndAuth } = require('../controllers/auth.controller');

// user create cart
router.post('/', verifyTokenAndAuth, async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');

    }
})

// update user cart
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const { id } = req.params
        const cart = await Cart.findByIdAndUpdate(id, {
            $set: req.body
        },
            { new: true });



        res.status(200).json(cart)
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');

    }
})
// delete user cart
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const { id } = req.params
        const cart = await Cart.findByIdAndDelete(id)
        res.status(200).json(cart)
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');

    }
})


// Get  user cart
router.get('/find/:userId', verifyTokenAndAuth, async (req, res) => {
    try {
        const { id } = req.params
        const cart = await Cart.findOne({userId:id})
        res.status(200).json(cart)
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');

    }
})

// Get  all cart
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const cart = await Cart.find()
        res.status(200).json(cart)
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Server Error');

    }
})

module.exports = router  