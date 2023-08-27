const mongoose  = require("mongoose");
const journalSchema  = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref:"userInfo"},
    id: {type:String,required:true},
    date :{type:Date,required:true},
    title:{type:String,required:true},
    text:{type:String,required:true},
    image:{type:String}
},{
    timestamps:true
})
const journalModel = mongoose.model('journals',journalSchema);

module.exports = journalModel;