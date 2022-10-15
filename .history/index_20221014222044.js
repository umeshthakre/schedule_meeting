require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })


app.get("/",(req,res)=>{
    res.send({"msg":"running successfully"});
});

app.listen(4000,(req,res)=>{
    console.log("running successfully on Port "+4000);
})


