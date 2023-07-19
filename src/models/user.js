const mongoose =require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name:{ type: String, require: true},
    email:{ type: String, require: true },
    password:{type:String}
});


userSchema.pre("save",function(next){
    if(!this.isModified("password"))  next();

   const hash= bcrypt.hashSync(this.password,8);
   this.password = hash;
   next();
});

userSchema.methods.checkPassword = function(password) {
    const match = bcrypt.compareSync(password, this.password);
    return match;
}
module.exports=mongoose.model("user", userSchema);