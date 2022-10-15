require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
app.use(bodyParser.json())

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("connected to db"))
.catch((err)=> console.log(err))

app.get("/",(req,res)=>{
    res.send({"msg":"running successfully"});
});

app.listen(4000,(req,res)=>{
    console.log("running successfully on Port "+4000);
})


