const mongoose = require("mongoose");

const loginDetailsSchema=new mongoose.Schema({
    userName:String,
    password:String
}, { timestamps: true })
module.exports = mongoose.model("loginDetails", loginDetailsSchema);