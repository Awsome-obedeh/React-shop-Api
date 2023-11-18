const express = require('express');
const router = express.Router();
const Products = require('./../models/product.models');
const { verifyTokenAdmin, verifyTokenAndAuth } = require('../controllers/auth.controller');

// create products

router.post('/create', verifyTokenAdmin, async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body

        if (!title || !desc || !img || !categories || !size || !color || !price) {
            return res.status(401).json('fill in all products field')
        }
        const products = new Products({ ...req.body });
        const savedProducts = await products.save()

        savedProducts ? res.status(200).json(savedProducts) : res.status(400).json("try again")



    } catch (error) {
        console.log(error);
        res.status(500).json('server error')
    }
})

// update products
router.put("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const updatedProducts = await Products.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedProducts);
    }
    catch (err) {
        console.log(err);
        res.json(500).json('Server Error')
    }

})
// delete products
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const deletedProducts = await Products.findByIdAndDelete(id)
        res.status(200).json("Product Deleted ");
    }
    catch (err) {
        console.log(err);
        res.json(500).json('Server Error')
    }

})
// get single products
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const { id } = req.params
        const product = await Products.findById(id)
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.json(500).json('Server Error')
    }

})

// Get all Products
router.get("/", verifyTokenAndAuth, async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;



    try {

        if (qNew) {
            const product = await Products.find().sort({ _id: -1 }).limit(5)
            res.status(200).json(product);
        }
        else if (qCategory) {
            // find products where category(male) is in the categories Array
            const product = await Products.find(
                { categories: { $in: [qCategory] } }
            )
            res.status(200).json(product)
        }
        else{
            const product = await Products.find().sort({ _id: -1 }).limit(5)
            res.status(200).json(product);
        }
    }
    catch (err) {
        console.log(err);
        res.json(500).json('Server Error')
    }

})

module.exports = router