const express = require('express');
const router = express.Router();
const {body,validationResult} = require("express-validator");

const Review = require('../models/review.model');

// Get Operation
router.get('/',async(req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    const review = await Review.find().skip(offset).limit(size).lean().exec();
    const totalReviewCount = await Review.find().count();
    const total_pages=Math.ceil(totalReviewCount/size);
 
    res.send({review,total_pages});
})

router.get('/:id',async (req,res)=>{
    const review = await Review.findById(req.params.id).lean().exec();
    res.send(review)
})

// router.get('/filter/:name',async (req,res)=>{
//     const artist_ = await Product.find({name:req.params.name}).lean().exec();
//     res.send({artist_,total_pages:1})
// })

//Post Operation 
router.post('/',
body('title').notEmpty().withMessage("Title is required"),
body('review').notEmpty().withMessage('Description To Specify Name'),
body('rating').notEmpty().withMessage('Need To Specify Rating'),
body('product').notEmpty().withMessage('Need To Specify Product'),
async(req,res)=>{
    const errors = validationResult(req);
        let final_error=null;
        if(!errors.isEmpty()){
            console.log(errors)
            final_error=errors.array().map(errors=>{
                return {
                    param:errors.param,
                    msg:errors.msg,
                    value:errors.value
                }
            })
            return res.status(400).json({error:final_error});
        }
       // console.log(final_error)
       const review = await Review.create(req.body);
    res.send(review);
})

// Patch Operation
router.patch('/:id',async(req,res)=>{
    const review = await Review.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    res.send(review)
})


// Delete Operation
router.delete('/:id',async(req,res)=>{
    const review = await Review.findByIdAndDelete(req.params.id);
    res.send(review)
})

module.exports = router;