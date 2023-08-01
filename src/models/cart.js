const mongoose =require("mongoose");
const albumSchema = new mongoose.Schema({
    product:[{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true}],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    quantity: {type: stringify, required: true}
});
module.exports=mongoose.model("album", albumSchema);