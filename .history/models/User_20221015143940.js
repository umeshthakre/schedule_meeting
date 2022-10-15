const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        maxLength:20,
        trim:true,
        required:true,
    },
    meetings:[{
        meetingStart:Date,
        meetingEnd:Date,
        user1:String,
        user2:String,
        room_id:String
    }]
})


module.exports = mongoose.model("User",UserSchema);