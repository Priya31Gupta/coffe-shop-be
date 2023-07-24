const express = require('express');
const router = express.Router();
const {body,validationResult} = require("express-validator");

const Product = require('../models/product');
const Review = require('../models/review.model');

// Get Operation
router.get('/',async(req,res)=>{
    const page = +req.query.page||1;
    const size = +req.query.size||5;
    const offset = (page-1)*5;
    const product = await Product.find().skip(offset).limit(size).lean().exec();
    res.send(product);
})

router.get('/:id',async (req,res)=>{
    const product = await Product.findById(req.params.id).lean().exec();
    const review = await Review.find({product: req.params.id}).populate("user_id");
    const avgRating = total_rating(review)
    res.send({product,review,avgRating})
})

const total_rating = (review) => {
    if(review && review.length <= 0) return null;
    var ratings = Object.values(review).map((el)=> Number(el.rating));
    let sum = 0;
    ratings.forEach(element => {
        sum =+ element;
    });
    const total_rating = sum/review.length;
    return total_rating.toFixed(2);
}
// router.get('/filter/:name',async (req,res)=>{
//     const artist_ = await Product.find({name:req.params.name}).lean().exec();
//     res.send({artist_,total_pages:1})
// })

//Post Operation 
router.post('/',
body('imageURL').notEmpty().withMessage("Image is required"),
body('name').notEmpty().withMessage('Need To Specify Name'),
body('price').notEmpty().withMessage('Need To Specify Name'),
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
       const product = await Product.create(req.body);
    res.send(product);
})

// Patch Operation
router.patch('/:id',async(req,res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    res.send({product,total_pages:1})
})


// Delete Operation
router.delete('/:id',async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send({product,total_pages:1})
})

module.exports = router;