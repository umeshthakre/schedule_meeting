const mongoose =  require('mongoose');
const RoomSchema = mongoose.Schema({
    RoomId,
    meetings:[{
        meetingStart:Date,
        meetingEnd:Date,
        user1:String,
        user2:String,
        room_id,
    }]
})


module.exports = mongoose.model("Room",RoomSchema);