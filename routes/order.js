const express = require('express');
const router = express.Router();
const Order = require('./../models/order.models');
const { verifyToken, verifyTokenAdmin, verifyTokenAndAuth } = require('../controllers/auth.controller');

// create Order
router.post('/', verifyTokenAndAuth, async (req, res) => {
    try {
        const order = new Order(req.body)
        const savedOrder = await order.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error")
    }
})

// update Order
router.put('/:id', verifyTokenAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id,
            { $set: req.body }, { new: true }
        )
        res.status(200).json(updatedOrder)
    } catch (err) {
        console.log(err);
        res.status(500).json("Server Error")
    }
})

// delete user order
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {

        const { id } = req.params
        const deletedOrder = await Order.findByidAndDelete(id);
        res.response(200).json("Order Deleted Successfully ");

    }
    catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }

})

// get user order
router.get('/find/:id', verifyTokenAndAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.find({ userId: id });
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).jons("Server Error")
    }

})
// get user order
router.get('/', verifyTokenAndAuth, async (req, res) => {

    try {
        const orders = await Order.find().sort({ _id: -1 });
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).jons("Server Error")
    }

})

// get monthly income stats
router.get('/income', verifyTokenAdmin, async (req, res) => {
    const d = new Date()
    const lastMonth = new Date(d.setMonth(d.getMonth() - 1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try {
        const income = await Order.aggregate([
            // match month that are greater than prev month
            {
                $match: {
                    createdAt: { $gte: prevMonth }
                }
            },

            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                },
            },

            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            }

        ]);
        res.status(200).json(income)

    } catch (error) {
        res.status(500).json('server Error')
        console.log(error)
    }
})

// router.get('/income', verifyTokenAdmin, async (req, res) => {
//     const d = new Date()
//     const lastMonth = new Date(d.setMonth(d.getMonth() - 1))
//     const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
//     try {
//         const income = await Order.aggregate([
//             // match documents with createdAt within the date range
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: prevMonth,
//                         $lt: lastMonth
//                     }
//                 }
//             },
//             // project the year and month for grouping
//             {
//                 $project: {
//                     year: { $year: '$createdAt' },
//                     month: { $month: '$createdAt' },
//                     sales: '$amount'
//                 },
                
//             },
//             // group by year and month
//             {
//                 $group: {
//                     _id:  "$month" ,
//                     total: { $sum: "$sales" }
//                 },
//             }
//         ]);console.log((income))
//         res.status(200).json(income);
//     } catch (error) {
//         res.status(500).json('server Error');
//         console.log(error);
//     }
// });


module.exports = router