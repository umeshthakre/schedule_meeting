const User = require("../models/User");
const Room = require("../models/Room");
const createUser = (req,res)=>{
    
    const {username} = req.body;
    
    User.findOne({username})
    .then((user)=>{
        if(!user){
            const myUser = new User({username:username});
            User.create(myUser)
            .then((createdUser)=>{
                return res.send({
                    message:"user created successfully",
                    success:true,
                    username:createdUser.username
                });
            })
            .catch(err=>console.log(err))
        }else{
            return res.send({
                success:false,
                message:"user with same username already exists"
            })
        }
    })
    .catch(err=>console.log(err))
}

module.exports = createUser;

const createRoom = (req,res)=>{
    const {roomId} = req.body;

    Room.findOne({roomId})
    .then((room)=>{
        if(!room){
            const myRoom = new Room({roomId});
            Room.create(myRoom)
            .then((roomFromDb)=>{
                return res.send({
                    success:true,
                    message:"room created successfully",
                    roomId:roomFromDb.roomId,
                })
            }).catch((err)=>console.log(err+" err from create room"))

        }else{
            return res.send({
                success:false,
                message:"room with same room id is already present",
            })
        }
    }).catch((err)=>{
        console.log(err+" from find rooom")
    })
} 

module.exports = createRoom;

const schedulemeeting = (req,res)=>{
    const {user1,user2,meetingStart,meetingEnd,roomId} = req.body;
    
}

const validate = (user1,user2,meetingStart,meetingEnd,roomId)=>{
    if(!user1 || !user2 || !meetingEnd || !meetingStart || !roomId){
        return res.send({
            success:false,
            message:"one of field is missiing"
        })
    }
}


module.exports = schedulemeeting;