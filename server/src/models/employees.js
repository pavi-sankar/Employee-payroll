const mongoose = require("mongoose")

const employeesSchema = new mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    DOB: String    
})

const employeesModel = mongoose.model("logins", employeesSchema)
module.exports =  employeesModel