
const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  dob: { type: String, required: true },
  contact: { type: String, required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('Emp', EmpSchema);

module.exports = Employee;
