const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        maxLength:20,
        trim:true,
        required:true,
    }
})


module.exports = mongoose.model("User",UserSchema);