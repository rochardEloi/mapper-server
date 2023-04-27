const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String},
    createdAt : {type : Date, default : Date.now},
    status : {type : String, required : true}
})

module.exports = mongoose.model("groups", groupSchema);

 