const express = require('express');
const deptModel = require('../models/Department');
const EmpModel= require('../models/Emp');
const Attendance= require('../models/Attendance');

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
  
      res.json({ empDetails, attendanceDetails, absentDays, calculatedSalary });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  


module.exports = router;