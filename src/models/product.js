const mongoose =require("mongoose");
const productSchema = new mongoose.Schema({
    imageURL:{ type: String, require: true},
    name:{ type: String, require: true },
    price:{type:String, require: true },
    description:{type: String},
    calorieCount:{type: String}
});

module.exports=mongoose.model("product", productSchema);