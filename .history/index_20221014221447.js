const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send({"msg":"running successfully"});
});

app.listen(4000,(req,res)=>{
    console.log("running successfully on Port "+4000);
})