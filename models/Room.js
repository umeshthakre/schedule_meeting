const mongoose =  require('mongoose');
const RoomSchema = mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        maxlength:10,
        trim:true,
    },
    meetings:[{
        meetingStart:Date,
        meetingEnd:Date,
        dateOfMeeting:Date,
        users:[String],
        room_id:String
    }]
})


module.exports = mongoose.model("Room",RoomSchema);