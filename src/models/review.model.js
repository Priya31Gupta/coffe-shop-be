const mongoose =require("mongoose");
const reviewSchema = new mongoose.Schema({
    title:{ type: String, require: true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    review:{type: String, require: true },
    rating:{type: String, require: true},
    product: {type:mongoose.Schema.Types.ObjectId,ref:'product'}
});

module.exports=mongoose.model("review", reviewSchema);