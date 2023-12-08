// Updated Attendance schema
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmpModel' },
  employeeName: { type: String }, // New field
  department: { type: String },    // New field
  date: { type: Date, required: true },
  status: { type: String, required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
