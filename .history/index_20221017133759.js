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
const {createUser,createRoom,scheduleMeeting1} = require("./controllers/controllers");
//using middleware to parse incoming req where content type is json
app.use(bodyParser.json())

const swaggerUi = require('swagger-ui-express');

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.post("/meetings/schedulemeeting",scheduleMeeting1);



//app is litening
app.listen(PORT,(req,res)=>{
    console.log("running successfully on Port "+PORT);
})


