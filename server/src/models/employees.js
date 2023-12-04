const mongoose = require("mongoose")

const employeesSchema = new mongoose.Schema({
    username: String,
    password: String,
    
})

const employeesModel = mongoose.model("users", employeesSchema)
module.exports =  employeesModel