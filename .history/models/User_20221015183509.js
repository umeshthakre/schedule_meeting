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
        dateOfMeeting:Date,
        users:[String],
        roomId:String
    }]
})


module.exports = mongoose.model("User",UserSchema);