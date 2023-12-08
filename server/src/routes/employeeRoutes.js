
const express = require('express');
const router = express.Router();
const EmpModel = require('../models/Emp');
const Attendance = require('../models/Attendance');

// to get all emp details
router.get('/getEmpDetails',async(req,res)=>{
    await EmpModel.find(req.body)
    .then(result =>res.json(result))
    .catch(err =>res.json(err))
  });

// POST route to add an employee
router.post('/postEmployee', async (req, res) => {
  try {
    const {
      employeeName,
      dob,
      contact,
      department,
      jobTitle,
      salary,
    } = req.body;

    // Validate input (you might want to add more validation)
    if (!employeeName || !dob || !contact || !department || !jobTitle || !salary) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Create a new employee instance
    const newEmployee = new EmpModel({
      employeeName,
      dob,
      contact,
      department,
      jobTitle,
      salary,
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    res.json(savedEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

    //delete employee
router.delete('/deleteEmp/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const deletedEmp = await EmpModel.findByIdAndDelete({ _id: id });
  
      if (!deletedEmp) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      //also delete coresponding Attendance log 
      await Attendance.deleteMany({ employeeId: id });
  
      res.json({ message: 'Employee deleted successfully', deletedEmp });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//to get selected emp  
router.get('/getEditEmp/:id',(req,res)=>{
 const id = req.params.id;
 EmpModel.findById({_id:id})
 .then(users=>res.json(users))
 .catch(err => res.json(err))
})

//update Emp
router.put('/putEmployee/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const oldEmployee = await Attendance.find({ employeeId: id }); 
    const oldEmployeeNames = oldEmployee.map(emp => emp.employeeName);
    const oldDepartmentName = oldEmployee.map(emp => emp.department);

    const updateEmp = await EmpModel.findByIdAndUpdate(id, {
      employeeName: req.body.employeeName,
      dob: req.body.dob,
      contact: req.body.contact,
      department: req.body.department,
      jobTitle: req.body.jobTitle,
      salary: req.body.salary
    }, { new: true });

    await Attendance.updateMany({ employeeName: { $in: oldEmployeeNames } }, {
      $set: { employeeName: req.body.employeeName },
    });

    await Attendance.updateMany({ department: {$in: oldDepartmentName} }, {
      $set: { department: req.body.department},
    });

    res.json(updateEmp);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//to get no of emp documents
router.get('/employeeCount', async (req, res) => {
  try {
    const employeeCount = await EmpModel.countDocuments();
    res.json({ count: employeeCount });
  } catch (error) {
    console.error('Error getting employee count', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//to get get no of employees in specific department
router.get('/api/employeeCount/:departmentName', async (req, res) => {
  const departmentName = req.params.departmentName;

  try {
    const employeeCount = await EmpModel.countDocuments({ department: departmentName });

    res.json({ count: employeeCount });
  } catch (error) {
    console.error('Error getting employee count', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
