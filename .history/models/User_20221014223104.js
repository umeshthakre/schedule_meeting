const mongoose = require('mongoose');
const User = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        maxLength:20,
        trim:true,
        required:true,
    }
})