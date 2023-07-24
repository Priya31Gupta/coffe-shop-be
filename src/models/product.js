const mongoose =require("mongoose");
const productSchema = new mongoose.Schema({
    imageURL:{ type: String, require: true},
    name:{ type: String, require: true },
    price:{type: String, require: true },
    description:{type: String},
    calorieCount:{type: Number},
    total_rating:{type: String},
    review: [{type:mongoose.Schema.Types.ObjectId,ref:'review'}]
});

module.exports=mongoose.model("product", productSchema);