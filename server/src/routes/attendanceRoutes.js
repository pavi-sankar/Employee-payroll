const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const EmpModel = require('../models/Emp');

//to mark the attendance
router.post('/markAttendance', async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (employeeId === 'all') {
      // Mark attendance for all employees
      const employees = await EmpModel.find({}, '_id');
      for (const employee of employees) {
        await markAttendanceForEmployee(employee._id, date, status);
      }
      return res.json({ message: 'Attendance marked for all employees' });
    } else {
      // Mark attendance for a specific employee
      await markAttendanceForEmployee(employeeId, date, status);
      return res.json({ message: 'Attendance marked successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function markAttendanceForEmployee(employeeId, date, status) {
  try {
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: new Date(date),
    });

    if (existingAttendance) {
      console.error(`Attendance already marked for employee ${employeeId} on ${date}`);
      return;
    }

    // Retrieve additional information from EmpModel using _id
    const employeeDetails = await EmpModel.findById(employeeId, 'employeeName department');

    // If attendance doesn't exist, create a new record in the Attendance collection
    await Attendance.create({
      employeeId,
      employeeName: employeeDetails.employeeName,
      department: employeeDetails.department,
      date: new Date(date),
      status,
    });
  } catch (error) {
    console.error(`Error marking attendance for employee ${employeeId}:`, error);
  }
}

//to display the attendance
router.get('/getAttendance', async (req, res) => {
    try {
      const { employeeName, startDate, endDate } = req.query;
  
      // Build the filter object based on the provided query parameters
      const filter = {};
      if (employeeName) {
        filter.employeeName = { $regex: new RegExp(employeeName, 'i') };
      }
      if (startDate) {
        filter.date = { $gte: new Date(startDate) };
      }
      if (endDate) {
        filter.date = { ...filter.date, $lte: new Date(endDate) };
      }
  
      // Fetch attendance data based on filters
      const attendanceData = await Attendance.find(filter);
  
      res.json(attendanceData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //to delete attendance
  router.delete('/deleteAttendance/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedAttendace = await Attendance.findByIdAndDelete({ _id: id });
  
      if (!deletedAttendace) {
        return res.status(404).json({ error: 'Attendance not found' });
      }
  
      res.json({ message: 'Attendance deleted successfully', deletedAttendace });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //to get attendance current date
  router.get('/getCurrentAttendance/', async (req, res) => {
    const dateString = new Date();
    dateString.setUTCHours(0, 0, 0, 0);

    try {
        const AttendanceCount = await Attendance.countDocuments({ date: dateString,status: 'present' });
    
        res.json({ count: AttendanceCount });
      } catch (error) {
        console.error('Error getting Attendance count', error);
        res.status(500).json({ error: 'Internal server error' });
      }   
  })

module.exports = router;
