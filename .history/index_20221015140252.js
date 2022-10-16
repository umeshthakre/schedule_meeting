//dotenv config
require("dotenv").config();
// imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const createUser = require("./controllers/controllers"); 

//using middleware to parse incoming req where content type is json
app.use(bodyParser.json())

//database connectivity
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("connected to db"))
.catch((err)=> console.log(err))

//routes
app.get("/",(req,res)=>{
    res.send({"msg":"running successfully"});
});

app.get("/createuser",createuser)

//app is litening
app.listen(4000,(req,res)=>{
    console.log("running successfully on Port "+4000);
})


