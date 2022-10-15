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
        DateOfMeeting:Date,
        user1:String,
        user2:String,
        roomId:String
    }]
})


module.exports = mongoose.model("User",UserSchema);