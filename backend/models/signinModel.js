const mongoose = require('mongoose');
const signinSchema  = new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
phone:{type:Number,required:true,unique:true},
password:{type:String,required:true},
date:{type:Date,default:Date.now()}
},{
    timestamps:true
})

const userInfo = mongoose.model("userInfo",signinSchema);

module.exports = userInfo;