const express = require('express');
const router = express.Router();
const {body,validationResult} = require("express-validator");

const User = require('../models/user');

// Get Operation
router.get('/',async(req,res)=>{
    const user = await User.find().lean().exec();
 
    res.send(user);
})

//Post Operation 
router.post('/',
body('name').notEmpty().withMessage("Artist name is required"),
body('email').notEmpty().isEmail().withMessage('Need To Specify Email'),
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
       const user = await User.create(req.body);
    res.send(user);
})

// Patch Operation
router.patch('/:id',async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    res.send({user,total_pages:1})
})


// Delete Operation
router.delete('/:id',async(req,res)=>{
    const artist_ = await User.findByIdAndDelete(req.params.id);
    res.send({artist_,total_pages:1})
})

module.exports = router;