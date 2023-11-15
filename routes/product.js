const express = require('express');
const router = express.Router();
const Products = require('./../models/product.models');
const { verifyTokenAdmin } = require('../controllers/auth.controller');

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
router.put("/:id", verifyTokenAdmin,async(req,res)=>{
    try{
        const{id}=req.params
        const updatedProducts=await Products.findByIdAndUpdate(id,
            {$set: req.body},
            {new:true}
        )
        res.status(200).json(updatedProducts);
    }
    catch(err){
        console.log(err);
        res.json(500).json('Server Error')
    }

})
// delete products
router.delete("/:id", verifyTokenAdmin,async(req,res)=>{
    try{
        const{id}=req.params
        const deletedProducts=await Products.findByIdAndDelete(id)
        res.status(200).json("Product Deleted ");
    }
    catch(err){
        console.log(err);
        res.json(500).json('Server Error')
    }

})
// get single products
router.get("/find/:id",async(req,res)=>{
    try{
        const{id}=req.params
        const product=await Products.findById(id)
        res.status(200).json(product);
    }
    catch(err){
        console.log(err);
        res.json(500).json('Server Error')
    }

})

module.exports = router