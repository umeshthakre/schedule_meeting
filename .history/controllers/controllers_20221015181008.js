const User = require("../models/User");
const Room = require("../models/Room");
const moment = require('moment'); // require
moment().format(); 

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
    //variables from req.body
    let {user1,user2,dateOfMeeting,meetingStart,meetingEnd,roomId} = req.body;

    console.log(user1,user2,dateOfMeeting,meetingStart,meetingEnd,roomId);
    //validation of fields
    // check if fields are missing
    if(!user1 || !user2 || !dateOfMeeting || !meetingEnd || !meetingStart || !roomId){
        return res.send({
            success:false,
            message:"one or more field is missing"
        })
    }
    // converting date and time to standard format
    //converting date and time of meeting to moment js Date format
   meetingStart = dateOfMeeting +" "+ meetingStart;
   console.log(meetingStart)
   meetingStart = moment(meetingStart,'YYYY-MM-DD hh:mm:ss a');
   console.log(meetingStart);
   meetingEnd = dateOfMeeting + " "+meetingEnd;
   meetingEnd = moment(meetingEnd,'YYYY-MM-DD hh:mm:ss a')
    console.log(meetingEnd);

    dateOfMeeting = moment(dateOfMeeting,"YYYY-MM-DD")

    // checking if the date and time are valid formats
    if(
    !moment(dateOfMeeting).isValid() 
    || !moment(meetingStart).isValid() 
    || !moment(meetingEnd).isValid()
    ){
        return res.send({
            success:false,
            message:"wrong date format"
        })
    }

    //checking if meeting start time is greater than end time

    if(meetingEnd < meetingStart){
        console.log("starting greater");
        return res.send({
            success:false,
            message:"invalid start and end time"
        })
    }

    User.find({
        'username':{
            $in:[
                user1,
                user2
            ]
        }
    })
    .then((usersfromdb)=>{
        if(!usersfromdb.length !== 2){
            return res.send({
                success:false,
                message:"user1 not found"
            })
        }
        console.log(user)

    })
    .catch(err=>console.error(log))
    
    
    
}


module.exports = schedulemeeting;