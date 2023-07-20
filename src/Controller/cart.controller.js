const express = require('express');
const router = express.Router();
const {body,validationResult} = require("express-validator");
const Product = require('../models/product');
const Cart = require('../models/cart');

// Get Operation
router.get('/:userId',async(req,res)=>{
    try{
        const product = await Cart.find({user_id: req.params.userId}).populate('product').lean().exec();
 
        res.send(product);
    }catch(e){
        console.log(`Error in getting cart ${e}`);
    }
})

//Post Operation 
router.post('/',
async(req,res)=>{
    try {
        const product = await Cart.create(req.body);
    res.send(product);
    } catch (error) {
        console.log(error,'error')
    }
    
})


// Delete Operation
router.delete('/:id',async(req,res)=>{
    const product = await Cart.findByIdAndDelete(req.params.id);
    res.send({product,total_pages:1})
})

module.exports = router;