//dotenv config
require("dotenv").config();
// imports
const {PORT,MONGO_URL} = process.env;
const express = require("express");
const app = express();
const moment = require('moment'); // require
moment().format(); 
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const {createUser,createRoom,schduleMeeting1} = require("./controllers/controllers");
//using middleware to parse incoming req where content type is json
app.use(bodyParser.json())

//database connectivity
mongoose.connect(MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("connected to db"))
.catch((err)=> console.log(err))

//routes
app.get("/",(req,res)=>{
    res.send({"msg":"running successfully"});
});

app.post("/user/createuser",createUser);

app.post("/room/createroom",createRoom);

app.post("/meetings/schedulemeeting",schedulemeeting1)

//app is litening
app.listen(PORT,(req,res)=>{
    console.log("running successfully on Port "+PORT);
})


