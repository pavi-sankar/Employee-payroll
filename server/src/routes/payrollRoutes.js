const express = require('express');
const deptModel = require('../models/Department');
const EmpModel= require('../models/Emp');
const Attendance= require('../models/Attendance');
const PayrollModel = require('../models/Payroll');

const router = express.Router();

router.get('/calculateSalary/:employeeId/:year/:month', async (req, res) => {
    const employeeId = req.params.employeeId;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
  
    try {
      // Get employee details
      const empDetails = await EmpModel.findById(employeeId);
  
      if (!empDetails) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Get attendance details for the employee and specific month
      const attendanceDetails = await Attendance.find({
        employeeId,
        date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) },
      });
  
      // Calculate absent days
      const absentDays = attendanceDetails.filter(entry => entry.status === 'absent').length;
  
      // Calculate salary based on absent days
      let calculatedSalary = empDetails.salary;
  
      if (absentDays > 10) {
        calculatedSalary *= 0.5; // 50% deduction for more than 10 days absent
      } else if (absentDays >= 5) {
        calculatedSalary *= 0.85; // 15% deduction for 5 to 10 days absent
      }
  
      res.json({ empDetails, attendanceDetails, absentDays, calculatedSalary, month, year});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// add payments done
router.post('/createPayroll', async (req, res) => {
  const {
    employeeId,
    employeeName,
    department,
    month,
    year,
    salary,
    paidSalary,
    absentDays,
    paidDate,
  } = req.body;

  try {
    // Check if payroll entry already exists for the same month and year
    const existingPayroll = await PayrollModel.findOne({
      employeeId,
      month,
      year,
    });

    if (existingPayroll) {
      return res.status(400).json({ error: 'Payroll already created for the specified month and year' });
    }

    // Create a new Payroll entry
    const newPayroll = new PayrollModel({
      employeeId,
      employeeName,
      department,
      month,
      year,
      salary,
      paidSalary,
      absentDays,
      paidDate,
    });

    // Save the new Payroll entry to the database
    await newPayroll.save();

    res.json({ message: 'Payroll created successfully', payroll: newPayroll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to display payroll history
router.get('/getpayrollhistory', async (req, res) => {
  try {
    const { empId, year, month } = req.query;

    // Build the filter object
    const filter = {};

    if (empId) filter.employeeId = empId;

    if (year && !isNaN(parseInt(year))) {
      filter.year = parseInt(year, 10);
    }

    if (month && !isNaN(parseInt(month))) {
      filter.month = parseInt(month, 10);
    }

    // Use the filter to find payroll data
    const payrollData = await PayrollModel.find(filter);

    res.json(payrollData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to delete payroll history
router.delete('/deletepayroll/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedpayroll = await PayrollModel.findByIdAndDelete({ _id: id });

    if (!deletedpayroll) {
      return res.status(404).json({ error: 'payroll not found' });
    }

    res.json({ message: 'payroll deleted successfully', deletedpayroll });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to calculate current month total paid salary
router.get('/totalPaidSalaryCurrentMonth', async (req, res) => {
  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();

    // Query the database for payroll records of the current month and year
    const payrollRecords = await PayrollModel.find({
      month: currentMonth,
      year: currentYear,
    });

    // Calculate the total paid salary
    const totalPaidSalary = payrollRecords.reduce((acc, record) => acc + record.paidSalary, 0);

    res.json({ totalPaidSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;