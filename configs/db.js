const mongoose = require('mongoose');
const connect =  ()=>{
    return mongoose.connect("mongodb+srv://priyakumarigupta790:PyuzFncilp5guVAT@cluster0.xeyydlm.mongodb.net/?retryWrites=true&w=majority");
}
module.exports = connect;