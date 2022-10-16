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
    let {users,dateOfMeeting,meetingStart,meetingEnd,roomId} = req.body;

    console.log(users,dateOfMeeting,meetingStart,meetingEnd,roomId);
    //validation of fields
    // check if fields are missing
    if(!users || !dateOfMeeting || !meetingEnd || !meetingStart || !roomId){
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

    let allUser = null;

    User.find({
        'username':{
            $in:users
        }
    })
    .then((usersfromdb)=>{
        allUser = usersfromdb;
        if(usersfromdb.length !== users.length){
            return res.send({
                success:false,
                message:"users not found"
            })
        }
        console.log(usersfromdb)

    })
    .catch(err=>console.error(log))

    if(allUser.length !== 0){
        for(let i = 0;i<allUser.length;i++){
            let meetings = allUser[i];

            for(let j = 0;j<meetings.length;j++){
                if(
                    moment(meetingStart).isBetween(meetings[i].meetingStart,meetings[i].meetingEnd)
                     ||
                    moment(meetingEnd).isBetween(meetings[i].meetingStart,meetings[i].meetingEnd)
                    ){ 
                    return res.send({success:false, message:`${allUser[i]} has a meeting ${meetings[j]}`})
                }
               
            }
        }

        let myMeeting = {
            allUser,
        }

    }
    
    
    
    
}


module.exports = schedulemeeting;