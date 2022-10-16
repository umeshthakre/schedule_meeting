const User = require("../models/User");
const Room = require("../models/Room");
const Dates = require("../models/Datesrandom");
const moment = require('moment-timezone');
moment().tz("Asia/Kolkata").format();
// moment().format(); 

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





const scheduleMeeting1 = async (req,res)=>{
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

   meetingStart = moment(meetingStart,'YYYY-MM-DD hh:mm:ss a');

   meetingEnd = dateOfMeeting + " "+meetingEnd;
   meetingEnd = moment(meetingEnd,'YYYY-MM-DD hh:mm:ss a')


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

    const allUser = await User.find({
        'username':{
            $in:users
        }
    });

    console.log(typeof allUser)

    if(!allUser || allUser.length !== users.length){
        return res.send({
            message:"users not found"
        })
    }

    //working till here

    // Dates.create({
    //     name:"randomdate",
    //     Date:moment("2022/10/25 8:00",'YYYY-MM-DD HH:mm')
    // }).then((datesfromdb)=>{
    //     console.log(moment("2022/10/25 8:00",'YYYY-MM-DD HH:mm'))
    //     console.log(moment(datesfromdb.Date));
    // })
    // .catch((err)=>console.log(err))


    // myMeeting = {
    //     users:["User1","User2"],
    //     dateOfMeeting:dateOfMeeting,
    //     meetingStart:meetingStart,
    //     meetingEnd:meetingEnd,
    //     roomId:"R1"
    //  }

    // User.findOneAndUpdate(
    //     {username:"User2"},
    //     { $push: { meetings: myMeeting } },
    //     { new: true }
    //     ).then((result)=>{
    //         console.log(result);
            
    //     }).catch((err)=>console.log(err));    

    

    for(let i = 0;i<allUser.length;i++){
        
        let meetings = allUser[i].meetings;
        for(let j = 0;j<meetings.length;j++){
            
            console.log("start from db",moment(allUser[i]+`${i}`+","+meetings[j].meetingStart))
            
            console.log("end from db",moment(allUser[i]+`${i}`+","+meetings[j].meetingEnd))
            if(
                moment(meetingStart).isBetween(moment(meetings[j].meetingStart),moment(meetings[j].meetingEnd))
                 ||
                moment(meetingEnd).isBetween(moment(meetings[j].meetingStart),moment(meetings[j].meetingEnd))
                ||

                moment(meetingStart).isSame(moment(meetings[j].meetingStart))
                ||
                moment(meetingEnd).isSame(moment(meetings[j].meetingEnd))
                ||
                moment(meetingStart).isSame(moment(meetings[j].meetingEnd))
                ||
                moment(meetingEnd).isSame(moment(meetings[j].meetingStart))
                ||
                moment(meetings[j].meetingStart).isBefore(moment(meetingStart))
                 &&
                moment(meetings[j].meetingEnd).isAfter(moment(meetingEnd))
                ){ 
                    
                    let s = `${allUser[i].username} 
                    has a meeting from ${moment(meetings[j].meetingStart)}
                     untill ${moment(meetings[j].meetingEnd)}`;
                return res.send({success:false, message:s})
            }
           
        }
    }


    const roomfromdb = await Room.findOne({roomId})

    if(!roomfromdb){
        return res.send({
            success:false,
            message:"room not found"
        })
    }

    //     let myRoomMeeting = {
    //     users:["User1","User2"],
    //     dateOfMeeting:dateOfMeeting,
    //     meetingStart:meetingStart,
    //     meetingEnd:meetingEnd,
    //     roomId:"R1"
    //  }

    //  Room.findOneAndUpdate({roomId},
    //     {$push:{meetings:myRoomMeeting}}
    //     ,{new:true}
    //     ).then((result)=>{
    //         console.log(result);
            
    //     });
     

    //  console.log("room meeting start from db",moment(roomfromdb.meetings[0].meetingStart));
    //  console.log("room meeting end from db",moment(roomfromdb.meetings[0].meetingEnd));

    for(let i = 0;i<roomfromdb.meetings.length;i++){
        let meeting = roomfromdb.meetings[i];
        console.log(meeting);
        if(
            moment(meeting.meetingStart).isBetween(moment(meetingStart),moment(meetingEnd))
            ||
            moment(meeting.meetingEnd).isBetween(moment(meetingStart),moment(meetingEnd))
            ||

            moment(meeting.meetingStart).isSame(moment(meetingStart))
            ||
            moment(meeting.meetingStart).isSame(moment(meetingEnd))
            ||

            moment(meeting.meetingStart).isSame(moment(meetingEnd))
            ||
            moment(meeting.meetingEnd).isSame(moment(meetingStart))
            ||

            moment(meeting.meetingStart).isBefore(moment(meetingStart))
             &&
            moment(meeting.meetingEnd).isAfter(moment(meetingEnd))
        ){

            let m = `${roomfromdb.roomId.toString()} is not available for the meeting between `
            +meetingStart.toString() +` and ${meetingEnd.toString()}`

            return res.send({
                success:false,
                message:m
            });
        }
    }

    let myMeeting = {
        users:users,
        meetingStart:meetingStart,
        meetingEnd:meetingEnd,
        roomId:roomId,
        dateOfMeeting:dateOfMeeting
    }

    for(let i = 0;i<allUser.length;i++){
        let mUser = allUser[i];
        mUsername = mUser.username;
        User.findOneAndUpdate(
            {mUsername},
            {$push:{meetings:myMeeting}},
            {new:true}
        ).then((meetings)=>{
            if(i+1 === allUser.length){
                console.log("success ",meetings);

                Room.findOneAndUpdate(
                    {roomId},
                    {$push:{meetings:myMeeting}},
                    {new:true}
                    ).then((updatedRoomMeeting)=>{
                        console.log({
                            success:true,
                            roomMeetings:updatedRoomMeeting
                        })
                    })

            }
        })
        .catch((err)=>console.log(err,"This is error is from User and room meeting update"))
    }

    

    return res.send({
        success:true,
        message:"updated successfully"
    })


}



module.exports ={
    createUser,
    createRoom,
    scheduleMeeting1
}