const mongoose = require("mongoose");

const elementSchema = mongoose.Schema({
    name  : {type : String, required : true},
    description : {type : String},
    group_id : {type : String, required : true},
    createdAt : {type : Date, default : Date.now },
    location : {type : Object, required : true},
    status : {type : String, required : true},
    state : {type : String}
})

module.exports = mongoose.model("elements", elementSchema)