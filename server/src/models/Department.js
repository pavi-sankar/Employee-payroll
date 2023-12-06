const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    depName: String,
    depDes: String,
    designation: String,
})

const departmentModel = mongoose.model("departments",departmentSchema)
module.exports = departmentModel