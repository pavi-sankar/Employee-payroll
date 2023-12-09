const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  paidSalary: {
    type: Number,
    required: true,
  },
  absentDays: {
    type: Number,
    required: true,
  },
  paidDate: {
    type: Date,
    required: true,
  },
});

const PayrollModel = mongoose.model("Payroll", payrollSchema);

module.exports = PayrollModel;