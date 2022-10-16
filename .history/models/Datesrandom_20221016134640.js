const mongoose = require('mongoose');
const Datesrandom = mongoose.Schema({
    name:String,
    Date:Date,
})

module.exports = mongoose.model("Dates",Datesrandom);