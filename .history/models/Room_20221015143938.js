const mongoose =  require('mongoose');
const RoomSchema = mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        maxlength:10,
    },
    meetings:[{
        meetingStart:Date,
        meetingEnd:Date,
        user1:String,
        user2:String,
        room_id:String
    }]
})


module.exports = mongoose.model("Room",RoomSchema);